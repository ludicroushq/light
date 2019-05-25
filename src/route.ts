import { run } from 'micro';
import { IncomingMessage, ServerResponse } from 'http';
import AWSServerlessMicro from 'aws-serverless-micro';
import pino from 'pino-http';
import { handleErrors } from 'micro-boom';
import bytes from 'bytes';

const { LIGHT_ENVIRONMENT, NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';
const isNetlify = LIGHT_ENVIRONMENT === 'netlify';
const isAWS = LIGHT_ENVIRONMENT === 'aws';

let Youch: any;
let forTerminal: any;

/* istanbul ignore next */
if (!isProd) {
  Youch = require('youch'); // eslint-disable-line
  forTerminal = require('youch-terminal'); // eslint-disable-line
}

// TODO: Define types for micro and aws
// TODO: Add test for POST/other methods
type Handler = any;
type IM = IncomingMessage;
type SR = ServerResponse;
type AP = Promise<any>;

let logger: any;
/* istanbul ignore next */
if (isProd) {
  const pinoHandler = pino();
  logger = (fn: any): any => async (req: IM, res: SR): AP => {
    pinoHandler(req, res);
    return fn(req, res);
  };
} else {
  const signale = require('./utils/logger'); // eslint-disable-line

  logger = (fn: any): any => async (req: IM, res: SR): AP => {
    const id = Math.random().toString(36).substring(2, 6);
    const log = signale.scope(id);
    const msg = `${req.url}`;
    const { method } = req as any;
    if (log[method]) {
      log[method](msg);
    } else {
      log.request(msg);
    }

    const done = (): void => {
      res.removeListener('finish', onfinish); // eslint-disable-line
      res.removeListener('close', onclose); // eslint-disable-line
      const status = res.statusCode;
      const len = (res as any)._contentLength; // eslint-disable-line
      let length;
      if ([204, 205, 304].includes(status)) {
        length = '';
      } else if (len == null) {
        length = '-';
      } else {
        length = bytes(len).toLowerCase();
      }
      log.response(`${status} ${length}`);
    };

    const onfinish = done.bind(null, 'finish');
    const onclose = done.bind(null, 'close');

    res.once('finish', onfinish);
    res.once('close', onclose);

    return fn(req, res);
  };
}

interface Route {
  path?: string;
  middleware?: any[];
  plugins?: any[];
  method?: string[] | string;
  handler: Handler;
}

const youchErrors = (fun: any): any => async (req: IM, res: SR): Promise<void> => {
  try {
    return await fun(req, res);
  } catch (err) {
    const youch = new Youch(err, req);
    const json = await youch.toJSON();
    console.log(forTerminal(json)); // eslint-disable-line
    throw err;
  }
};

export default (route: Route): Handler => {
  const isRunKit = LIGHT_ENVIRONMENT === 'runkit';

  const fn = async (Req: IM, Res: SR): AP => {
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

    if ((fn as any).log !== false) {
      plugins.unshift(logger);
      (fn as any).log = false;
    }

    /* istanbul ignore next */
    if (!isProd) {
      plugins.unshift(youchErrors);
    }

    plugins.unshift(handleErrors);

    if (plugins.length) {
      exec = plugins.reverse().reduce((acc, val): any => val(acc), exec);
    }

    return exec(Req, Res);
  };


  Object.keys(route).forEach((key): void => {
    (fn as any)[key] = (route as any)[key];
  });

  (fn as any).log = true;
  (fn as any).module = __dirname;
  (fn as any).handler = fn;
  /* istanbul ignore next */
  if (!isNetlify && !isAWS) {
    (fn as any).handler = async (req: IM, res: SR): AP => run(req, res, fn);
  }

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
