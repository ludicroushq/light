import AWSServerlessMicro from './node_modules/aws-serverless-micro';
import { run } from './node_modules/micro';
import { handleErrors } from './node_modules/micro-boom';
import pino from './node_modules/pino';
import pinoHTTP from './node_modules/pino-http';
import Youch from './node_modules/youch';
import forTerminal from './node_modules/youch-terminal';

import { IM, SR, AP } from '../src/types/http';
import { Options, Route } from '../src/types/route';

import pinoPretty from './helpers/pino-pretty';

// TODO: abstract out more stuff

const { LIGHT_ENV } = process.env;

// TODO: extra to a different folder
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

// TODO: remove extra logger out of here
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
  // closures
  let options = getOptions(opts || {});
  const _middleware: any[] = [];
  const _plugins: any[] = [];

  return {
    handler(fn: ((req: IM, res: SR) => {} | any)): (req: IM, res: SR) => {} {
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
            endpoint: handler,
          };
        }
      }

      return handler;
    },
  };
};
