import { run } from 'micro';
import { IncomingMessage, ServerResponse } from 'http';
import AWSServerlessMicro from 'aws-serverless-micro';

import { handleErrors } from 'micro-boom';

const { LIGHT_ENVIRONMENT } = process.env;

const youchErrors = require('./utils/route/youch');
const logger = require('./utils/route/logger');

// TODO: Define types for micro and aws
// TODO: Add test for POST/other methods
type Handler = any;
type IM = IncomingMessage;
type SR = ServerResponse;
type AP = Promise<any>;

interface Route {
  path?: string;
  middleware?: any[];
  plugins?: any[];
  method?: string[] | string;
  handler: Handler;
}

export default (route: Route): Handler => {
  const proxy = async (Req: IM, Res: SR): AP => {
    let exec = async (req: IM, res: SR): AP => {
      const middleware: any[] = route.middleware || [];

      for (const mw of middleware) { // eslint-disable-line
        await mw(req, res); // eslint-disable-line

        if (res.headersSent) {
          return null;
        }
      }

      return route.handler(req, res);
    };

    const plugins = route.plugins || [];

    if ((proxy as any).log !== false) {
      plugins.unshift(logger);
      (proxy as any).log = false;
    }

    plugins.unshift(youchErrors);
    plugins.unshift(handleErrors);

    if (plugins.length) {
      exec = plugins.reverse().reduce((acc, val): any => val(acc), exec);
    }

    return exec(Req, Res);
  };

  const { env } = process;
  const isNetlify = LIGHT_ENVIRONMENT === 'netlify' || env.LIGHT_ENVIRONMENT === 'netlify';
  const isAWS = LIGHT_ENVIRONMENT === 'aws' || env.LIGHT_ENVIRONMENT === 'aws';
  const isRunKit = LIGHT_ENVIRONMENT === 'runkit' || env.LIGHT_ENVIRONMENT === 'runkit';

  const fn = (isNetlify || isAWS) ? proxy : async (req: IM, res: SR): AP => run(req, res, proxy);
  Object.assign(fn, route, { handler: fn });

  (fn as any).log = true;
  (fn as any).module = __dirname;

  /* istanbul ignore if */
  if (isNetlify || isAWS) {
    return {
      handler: AWSServerlessMicro(fn),
    };
  }

  if (isRunKit) {
    return {
      endpoint: fn,
    };
  }

  return fn;
};
