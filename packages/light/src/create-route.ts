// import AWSServerlessMicro from 'aws-serverless-micro';
// import { run } from 'micro';
// import { handleErrors } from 'micro-boom';

import { IncomingMessage, ServerResponse } from 'http';

// import loggerPlugin from './plugins/logger';
// import errorHandlerPlugin from './plugins/error-handler';
// import youchPlugin from './plugins/youch';

// import { IM, SR, AP } from './types/http';
// import { Options } from './types/route';

// type Middleware = (req: IM, res: SR) => any;
// type Plugin = (fn: (req: IM, res: SR) => any) => (req: IM, res: SR) => any;

// const { LIGHT_ENV } = process.env;

// const getOptions = (...opts: Options[]): Options => {
//   const defaultOptions = {
//     dev: !(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'),
//     requestLogger: true,
//     errorHandler: true,
//   };
//   return Object.assign({}, defaultOptions, ...opts);
// };

// export default (name: string, opts?: Options): any => {
//   if (!name) throw new Error('route must have a unique name');
//   const _name = name;
//   let options = getOptions(opts || {});
//   const _middleware: Middleware[] = [];
//   const _plugins: Plugin[] = [];

//   return {
//     route(fn: (req: IM, res: SR) => any): (req: IM, res: SR, opts: any) => AP {
//       if (!fn) throw new Error('please provide a function to route');

//       // get default if using import/export syntax
//       let func: any = fn;
//       if (func.default) {
//         func = func.default;
//       }

//       // apply middleware to the route
//       /* istanbul ignore next */
//       const proxy = async (Req: IM, Res: SR, reqOpts: Options = {}): AP => {
//         options = getOptions(options, reqOpts);

//         let wrappedFunction = async (req: IM, res: SR): AP => {
//           for (const mw of _middleware) { // eslint-disable-line
//             await mw(req, res); // eslint-disable-line

//             if (res.headersSent) {
//               return null;
//             }
//           }

//           return func(req, res);
//         };

//         // apply plugins to the route
//         const plugins = [
//           loggerPlugin(options),
//           options.errorHandler ? handleErrors : null,
//           errorHandlerPlugin(options),
//           ..._plugins,
//         ].filter((x: any): any => x);
//         if (options.dev) {
//           plugins.push(youchPlugin);
//         }
//         wrappedFunction = plugins
//           .reverse()
//           .reduce((acc: any, val: any): any => val(acc), wrappedFunction);

//         return wrappedFunction(Req, Res);
//       };

//       // set the name for cli
//       (proxy as any)._name = _name;

//       // detect if serverless environment
//       const { env } = process;
//       const isNetlify = LIGHT_ENV === 'netlify' || env.LIGHT_ENV === 'netlify';
//       const isAWS = LIGHT_ENV === 'aws' || env.LIGHT_ENV === 'aws';
//       const isRunKit = LIGHT_ENV === 'runkit' || env.LIGHT_ENV === 'runkit';
//       const isNow = LIGHT_ENV === 'now' || env.LIGHT_ENV === 'now';

//       const isServerless = isNetlify || isAWS || isRunKit || isNow;

//       // TODO: test this in runkit and now tests
//       let handler: any = async (req: IM, res: SR, ops: Options): AP => run(
//         req,
//         res,
//         (a, b): AP => proxy(a, b, ops),
//       );
//       // transform exports
//       if (isServerless) {
//         if (isNetlify || isAWS) {
//           handler = {
//             handler: AWSServerlessMicro(proxy),
//           };
//         }
//         if (isRunKit) {
//           handler = {
//             endpoint: handler,
//           };
//         }
//       }

//       return handler;
//     },
//     addMiddleware(...fns: Middleware[]): void {
//       _middleware.push(...fns.filter((x: any): any => x));
//     },
//     addPlugin(...fns: Plugin[]): void {
//       _plugins.push(...fns.filter((x: any): any => x));
//     },
//   };
// };

type Request = IncomingMessage;
type Response = ServerResponse;

type HTTPMethod = 'connect' | 'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put' | 'trace';

interface RouteParams {
  req: Request;
  res: Response;
}
type RouteFunction = (params: RouteParams) => {};
type RouteWrapper = (fn: RouteFunction) => void
type RouteReturn = Partial<Record<HTTPMethod, RouteWrapper>> & {
  route: (req: Request, res: Response) => {};
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
  const route = async (req: Request, res: Response): Promise<any> => {
    const method = req.method as HTTPMethod;

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

    return handlers.get?.({ req, res });
  };

  /**
   * Generate wrapper functions for all http methods
   */
  const genFunction = (key: HTTPMethod): RouteWrapper => (fn: RouteFunction): void => {
    handlers[key] = fn;
  };

  const methods: HTTPMethod[] = ['connect', 'delete', 'get', 'head', 'options', 'patch', 'post', 'put', 'trace'];

  const wrappers = JSON.parse('{}');
  methods.forEach((method): void => {
    wrappers[method] = genFunction(method);
  });

  return {
    route,
    useMiddleware,
    usePlugin,
    ...wrappers,
  };
};
