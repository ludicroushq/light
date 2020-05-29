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
import useParams from './utils/use-params';
import {
  CreateRoute,
  Context,
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

  const useMiddleware = (middleware: Middleware, methods?: HTTPMethod[]): void => {
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
  const fun = async (req: Request, res: Response): Promise<any> => {
    const method = req.method?.toLowerCase() as HTTPMethod;

    const context: Context = {
      req,
      res,
      buffer,
      text,
      json,
      send,
      sendError,
      createError,
      useParams,
    };
    let handler = async (ctx: Context): Promise<any> => {
      const applyMiddleware = async (mw?: Middleware[]): Promise<boolean> => {
        if (!mw) return false;
        // eslint-disable-next-line no-restricted-syntax
        for (const middleware of mw) {
          // eslint-disable-next-line no-await-in-loop
          await middleware(ctx);

          if (ctx.res.headersSent) {
            return true;
          }
        }
        return false;
      };

      if (await applyMiddleware(_middleware.global)) return null;
      if (await applyMiddleware(_middleware[method])) return null;

      const methodNotSupported: HandlerFunction = ({ res: mnsRes, send: mnsSend }): void => {
        mnsSend(mnsRes, 405, 'Method Not Allowed');
      };

      const fn = handlers[method] || handlers.all || methodNotSupported;

      return fn(ctx);
    };

    const applyPlugins = (p?: Plugin[]): void => {
      if (!p || !p.length) return;

      handler = p
        .reverse()
        .reduce((acc: any, val: any): any => val(acc), handler);
    };

    // applyPlugins(run);
    applyPlugins(_plugins.global);
    applyPlugins(_plugins[method]);


    return handler(context);
  };

  /**
   * Generate wrapper functions for all http methods
   */
  const genFunction = (key: HTTPMethod | 'all'): HandlerMethod => (fn: HandlerFunction): void => {
    if (!fn) throw new Error('please provide a function to method');
    handlers[key] = fn;
  };


  const wrappers = JSON.parse('{}');
  [...Methods, 'all'].forEach((method): void => {
    wrappers[method] = genFunction(method as HTTPMethod | 'all');
  });

  let route: AnyRoute = fun;

  // transform exports
  if (isServerless) {
    if (isNow) {
      route = (a: Request, b: Response): {} => run(a, b, (fun as RequestHandler));
    }
    if (isNetlify || isAWS) {
      route = {
        handler: AWSServerlessMicro(fun),
      };
    }
    if (isRunKit) {
      route = {
        endpoint: (a: Request, b: Response): {} => run(a, b, (fun as RequestHandler)),
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
