import { run } from 'micro';
import { IncomingMessage, ServerResponse } from 'http';
import AWSServerlessMicro from 'aws-serverless-micro';
import path from 'path';
import { handleErrors } from 'micro-boom';

import log from './utils/logger';
import { existsSync } from 'fs';

const { LIGHT_ENVIRONMENT } = process.env;

const youchErrors = require('./utils/route/youch'); // eslint-disable-line @typescript-eslint/no-var-requires
const logger = require('./utils/route/logger'); // eslint-disable-line @typescript-eslint/no-var-requires

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

let cwd = process.cwd();
const requirePaths = []
while (cwd !== '/') {
  requirePaths.push(cwd);
  cwd = path.join(cwd, '../');
}
const configPaths = requirePaths.map((p) => path.join(p, 'light.config.js'));

const config = configPaths.reduce((acc, val) => {
  let conf = {};
  if (existsSync(val)) {
    try {
      console.log('requiring')
      conf = require(val);
    } catch (err) {
      log.error(`unable to import light.config.js: ${err}`);
    }
  }
  return {
    ...acc,
    ...conf,
  };
}, {});

export default (route: Route): Handler => {
  console.log('handler config is', config);
  const proxy = async (Req: IM, Res: SR): AP => {
    console.log('proxy config is', config)
    let exec = async (req: IM, res: SR): AP => {
      const middleware: any[] = route.middleware || [];

      for (const mw of middleware) { // eslint-disable-line
        await mw(req, res); // eslint-disable-line

        if (res.headersSent) {
          return null;
        }
      }

      console.log('config is', config)

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

  console.log('final config is', config)

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
