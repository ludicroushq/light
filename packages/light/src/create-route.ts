import AWSServerlessMicro from 'aws-serverless-micro';
import { IncomingMessage, ServerResponse } from 'http';
import {
  buffer,
  text,
  json,
  run,
  send,
  sendError,
  createError,
  RequestHandler,
} from 'micro';

// detect if serverless environment
const { LIGHT_ENV } = process.env;
const isNetlify = LIGHT_ENV === 'netlify';
const isAWS = LIGHT_ENV === 'aws';
const isRunKit = LIGHT_ENV === 'runkit';
const isNow = LIGHT_ENV === 'now';
const isServerless = isNetlify || isAWS || isRunKit || isNow;


type Request = IncomingMessage;
type Response = ServerResponse;

type HTTPMethod = 'connect' | 'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put' | 'trace';

interface RouteParams {
  req: Request;
  res: Response;
  buffer: typeof buffer;
  text: typeof text;
  json: typeof json;
  run: typeof run;
  send: typeof send;
  sendError: typeof sendError;
  createError: typeof createError;
}
type RouteFunction = (params: RouteParams) => {};
type RouteWrapper = (fn: RouteFunction) => void
type NormalRoute = (req: Request, res: Response) => {};
interface RunkitRoute {
  endpoint: NormalRoute;
}
interface AWSRoute {
  handler: NormalRoute;
}
type ReturnedRoute = NormalRoute | RunkitRoute | AWSRoute;
type RouteReturn = Partial<Record<HTTPMethod, RouteWrapper>> & {
  route: ReturnedRoute;
  useMiddleware: (middleware: Middleware, methods?: HTTPMethod[]) => void;
  usePlugin: (plugin: Plugin, methods?: HTTPMethod[]) => void;
}

type Handlers = Partial<Record<HTTPMethod | 'all', RouteFunction>>;

type Middleware = any;
type MiddlewareObject = Partial<Record<HTTPMethod | 'global', Middleware[]>>;
type Plugin = any;
type PluginObject = Partial<Record<HTTPMethod | 'global', Plugin[]>>;

export default (): RouteReturn => {
  const _middleware: MiddlewareObject = JSON.parse('{}');
  const _plugins: PluginObject = JSON.parse('{}');
  const handlers: Handlers = JSON.parse('{}');

  const useMiddleware = (middleware: MiddlewareObject, methods?: HTTPMethod[]): void => {
    if (methods) {
      // TODO:
    }

    if (!_middleware.global) {
      _middleware.global = [];
    }
    _middleware.global.push(middleware);
  };

  const usePlugin = (plugin: Plugin, methods?: HTTPMethod[]): void => {
    if (methods) {
      // TODO:
    }

    if (!_plugins.global) {
      _plugins.global = [];
    }
    _plugins.global.push(plugin);
  };

  /**
   * The route that is exposed in every file
   * Essentially a self contained server (allows it to work in serverless environments)
   */
  let route: ReturnedRoute = async (Req: Request, Res: Response): Promise<any> => {
    const method = Req.method?.toLowerCase() as HTTPMethod;

    let wrappedFunction = async (req: Request, res: Response): Promise<any> => {
      const applyMiddleware = async (mw?: Middleware[]): Promise<void> => {
        if (!mw) return;
        // eslint-disable-next-line no-restricted-syntax
        for (const middleware of mw) {
          // eslint-disable-next-line no-await-in-loop
          await middleware(req, res);
        }
      };

      await applyMiddleware(_middleware.global);
      await applyMiddleware(_middleware[method]);

      const methodNotSupported: RouteFunction = ({ createError: createError405 }): {} => {
        throw createError405(405, 'Method Not Allowed');
      };

      const handler = handlers[method] || methodNotSupported;

      return handler({
        req,
        res,
        buffer,
        text,
        json,
        run,
        send,
        sendError,
        createError,
      });
    };

    const applyPlugins = (p?: Plugin): void => {
      if (!p) return;

      wrappedFunction = p
        .reverse()
        .reduce((acc: any, val: any): any => val(acc), wrappedFunction);
    };

    // applyPlugins(run);
    applyPlugins(_plugins.global);
    applyPlugins(_plugins[method]);


    return wrappedFunction(Req, Res);
  };

  /**
   * Generate wrapper functions for all http methods
   */
  const genFunction = (key: HTTPMethod): RouteWrapper => (fn: RouteFunction): void => {
    if (!fn) throw new Error('please provide a function to method');
    handlers[key] = fn;
  };

  const methods: HTTPMethod[] = ['connect', 'delete', 'get', 'head', 'options', 'patch', 'post', 'put', 'trace'];

  const wrappers = JSON.parse('{}');
  methods.forEach((method): void => {
    wrappers[method] = genFunction(method);
  });

  // transform exports
  if (isServerless) {
    if (isNetlify || isAWS) {
      route = {
        handler: AWSServerlessMicro(route),
      };
    }
    if (isRunKit) {
      route = {
        endpoint: (a: Request, b: Response): {} => run(a, b, (route as RequestHandler)),
      };
    }
  }

  return {
    route,
    useMiddleware,
    usePlugin,
    ...wrappers,
  };
};
