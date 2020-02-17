import AWSServerlessMicro from 'aws-serverless-micro';
import { run } from 'micro';
import { handleErrors } from 'micro-boom';

import loggerPlugin from './plugins/logger';
import errorHandlerPlugin from './plugins/error-handler';
import youchPlugin from './plugins/youch';

import { IM, SR, AP } from './types/http';
import { Options } from './types/route';

type Middleware = (req: IM, res: SR) => any;
type Plugin = (fn: (req: IM, res: SR) => any) => (req: IM, res: SR) => any;

const { LIGHT_ENV } = process.env;

const getOptions = (...opts: Options[]): Options => {
  const defaultOptions = {
    dev: !(process.env.NODE_ENV === 'production'),
    requestLogger: true,
    errorHandler: true,
  };
  return Object.assign({}, defaultOptions, ...opts);
};

export default (name: string, opts?: Options): any => {
  if (!name) throw new Error('route must have a unique name');
  const _name = name;
  let options = getOptions(opts || {});
  const _middleware: Middleware[] = [];
  const _plugins: Plugin[] = [];

  return {
    withHandler(fn: (req: IM, res: SR) => any): (req: IM, res: SR, opts: any) => AP {
      if (!fn) throw new Error('please provide a function to withHandler');

      // get default if using import/export syntax
      let func: any = fn;
      if (func.default) {
        func = func.default;
      }

      // apply middleware to the route
      /* istanbul ignore next */
      const proxy = async (Req: IM, Res: SR, reqOpts: Options = {}): AP => {
        options = getOptions(options, reqOpts);

        let wrappedFunction = async (req: IM, res: SR): AP => {
          for (const mw of _middleware) { // eslint-disable-line
            await mw(req, res); // eslint-disable-line

            if (res.headersSent) {
              return null;
            }
          }

          return func(req, res);
        };

        // apply plugins to the route
        const plugins = [
          loggerPlugin(options),
          options.errorHandler ? handleErrors : null,
          errorHandlerPlugin(options),
          ..._plugins,
        ].filter((x: any): any => x);
        if (options.dev) {
          plugins.push(youchPlugin);
        }
        wrappedFunction = plugins
          .reverse()
          .reduce((acc: any, val: any): any => val(acc), wrappedFunction);

        return wrappedFunction(Req, Res);
      };

      // set the name for cli
      (proxy as any)._name = _name;

      // detect if serverless environment
      const { env } = process;
      const isNetlify = LIGHT_ENV === 'netlify' || env.LIGHT_ENV === 'netlify';
      const isAWS = LIGHT_ENV === 'aws' || env.LIGHT_ENV === 'aws';
      const isRunKit = LIGHT_ENV === 'runkit' || env.LIGHT_ENV === 'runkit';
      const isNow = LIGHT_ENV === 'now' || env.LIGHT_ENV === 'now';

      const isServerless = isNetlify || isAWS || isRunKit || isNow;

      // transform exports
      let handler: any = proxy;
      if (isServerless) {
        if (isRunKit || isNow) {
          // TODO: test this in runkit and now tests
          /* istanbul ignore next */
          handler = async (req: IM, res: SR): AP => run(req, res, (proxy as any));
        }
        if (isNetlify || isAWS) {
          handler = {
            handler: AWSServerlessMicro(proxy),
          };
        }
        if (isRunKit) {
          handler = {
            endpoint: handler,
          };
        }
      }

      return handler;
    },
    addMiddleware(...fns: Middleware[]): void {
      _middleware.push(...fns.filter((x: any): any => x));
    },
    addPlugin(...fns: Plugin[]): void {
      _plugins.push(...fns.filter((x: any): any => x));
    },
  };
};
