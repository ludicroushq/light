import AWSServerlessMicro from 'aws-serverless-micro';
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
import {
  CreateRoute,
  MiddlewareObject,
  PluginObject,
  Handlers,
  HTTPMethod,
  Methods,
  AnyRoute,
  Middleware,
  Plugin,
  HandlerFunction,
  HandlerMethod,
  Request,
  Response,
} from './types/route';

// detect if serverless environment
const { LIGHT_ENV } = process.env;
const isNetlify = LIGHT_ENV === 'netlify';
const isAWS = LIGHT_ENV === 'aws';
const isRunKit = LIGHT_ENV === 'runkit';
const isNow = LIGHT_ENV === 'now';
const isServerless = isNetlify || isAWS || isRunKit || isNow;


export default (): CreateRoute => {
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
  let route: AnyRoute = async (Req: Request, Res: Response): Promise<any> => {
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

      const methodNotSupported: HandlerFunction = ({ createError: createError405 }): {} => {
        throw createError405(405, 'Method Not Allowed');
      };

      const handler = handlers[method] || methodNotSupported;

      return handler({
        req,
        res,
        buffer,
        text,
        json,
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
  const genFunction = (key: HTTPMethod): HandlerMethod => (fn: HandlerFunction): void => {
    if (!fn) throw new Error('please provide a function to method');
    handlers[key] = fn;
  };


  const wrappers = JSON.parse('{}');
  Methods.forEach((method): void => {
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
    run,
    ...wrappers,
  };
};
