import { IncomingMessage, ServerResponse } from 'http';
import AWSServerlessMicro from 'aws-serverless-micro';
import { run } from 'micro';

import { handleErrors } from 'micro-boom';
import pino from 'pino';
import pinoHTTP from 'pino-http';
import Youch from 'youch';
import forTerminal from 'youch-terminal';

import pinoPretty from './helpers/pino-pretty';

const { LIGHT_ENV } = process.env;

type IM = IncomingMessage;
type SR = ServerResponse;
type AP = Promise<any>;

interface Route {
  handler: (fn: (req: IM, res: SR) => {} | any) => (req: IM, res: SR) => {};
  middleware: (fn: any) => void;
  plugins: (fn: any) => void;
}

interface Options {
  dev?: boolean;
  requestLogger?: boolean;
  errorHandler?: boolean;
}

const youchPlugin = (fun: any): any => async (req: IM, res: SR): Promise<void> => {
  try {
    return await fun(req, res);
  } catch (err) {
    const youch = new Youch(err, req);
    const json = await youch.toJSON();
    console.log(forTerminal(json)); // eslint-disable-line
    return youch.toHTML();
  }
};

// TODO: Extra logger out of here
const loggerPlugin = ({ dev, requestLogger }: Options): any => {
  const pinoOptions = dev ? {
    prettyPrint: true,
    prettifier: pinoPretty,
    level: 'trace',
  } : {};
  const logger = pino((pinoOptions as any));
  const pinoHandler = pinoHTTP({
    logger,
  });
  return (fn: any): any => async (req: IM, res: SR): AP => {
    if (requestLogger) {
      pinoHandler(req, res);
    }
    return fn(req, res);
  };
};

const errorHandler = ({ errorHandler: errH, dev }: Options): any => {
  const pinoOptions = dev ? {
    prettyPrint: true,
    prettifier: pinoPretty,
    level: 'trace',
  } : {};
  const logger = pino((pinoOptions as any));
  return (fun: any): any => async (req: IM, res: SR): Promise<void> => {
    try {
      return await fun(req, res);
    } catch (err) {
      if (errH) {
        logger.error(err);
      }
      throw err;
    }
  };
};

const getOptions = (...opts: Options[]): Options => {
  const defaultOptions = {
    dev: !(process.env.NODE_ENV === 'production'),
    requestLogger: true,
    errorHandler: true,
  };
  return Object.assign({}, defaultOptions, ...opts);
};

export default (opts?: Options): Route => {
  // TODO: allow for disabling of all options
  let options = getOptions(opts || {});

  const _middleware: any[] = [];
  const _plugins: any[] = [];

  return {
    middleware(...fns: any[]): void {
      _middleware.push(...fns);
    },

    plugins(...fns: any[]): void {
      _plugins.push(...fns);
    },

    handler(fn: ((req: IM, res: SR) => {} | any)): (req: IM, res: SR) => {} {
      if (!fn) {
        throw new Error('route is missing');
      }
      let func: any = fn;
      if (func.default) {
        func = func.default;
      }

      const wrapper = async (Req: IM, Res: SR, reqOpts?: Options): AP => {
        options = getOptions(options, (reqOpts || {}));

        let proxy = async (req: IM, res: SR): AP => {
          for (const mw of _middleware) { // eslint-disable-line
            await mw(req, res); // eslint-disable-line

            if (res.headersSent) {
              return null;
            }
          }

          return func(req, res);
        };

        const plugins = [
          loggerPlugin(options),
          options.errorHandler ? handleErrors : null,
          errorHandler(options),
          ..._plugins,
        ].filter((x: any): any => x);

        if (options.dev) {
          plugins.push(youchPlugin);
        }

        proxy = plugins.reverse().reduce((acc: any, val: any): any => val(acc), proxy);

        return proxy(Req, Res);
      };

      // detect if serverless environment
      const { env } = process;
      const isNetlify = LIGHT_ENV === 'netlify' || env.LIGHT_ENV === 'netlify';
      const isAWS = LIGHT_ENV === 'aws' || env.LIGHT_ENV === 'aws';
      const isRunKit = LIGHT_ENV === 'runkit' || env.LIGHT_ENV === 'runkit';
      const isNow = LIGHT_ENV === 'now' || env.LIGHT_ENV === 'now';

      const isServerless = isNetlify || isAWS || isRunKit || isNow;

      // transform exports
      let handler: any = wrapper;
      if (isServerless) {
        if (isRunKit || isNow) {
          // TODO: test this in runkit and now tests
          /* istanbul ignore next */
          handler = async (req: IM, res: SR): AP => run(req, res, (wrapper as any));
        }
        if (isNetlify || isAWS) {
          handler = {
            handler: AWSServerlessMicro(wrapper),
          };
        }
        if (isRunKit) {
          handler = {
            endpoint: wrapper,
          };
        }
      }

      return handler;
    },
  };
};
