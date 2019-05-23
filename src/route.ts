import { run } from 'micro';
import { IncomingMessage, ServerResponse } from 'http';
import AWSServerlessMicro from 'aws-serverless-micro';
import pino from 'pino-http';
import { handleErrors } from 'micro-boom';
import bytes from 'bytes';

const isProd = process.env.NODE_ENV === 'production';

let Youch: any;
let forTerminal: any;
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

    if (fn.log !== false) {
      plugins.unshift(logger);
      fn.log = false;
    }

    if (!isProd) {
      plugins.unshift(youchErrors);
    }

    plugins.unshift(handleErrors);

    if (plugins.length) {
      exec = plugins.reverse().reduce((acc, val): any => val(acc), exec);
    }

    return run(Req, Res, exec);
  };

  Object.keys(route).forEach((key): void => {
    (fn as any)[key] = (route as any)[key];
  });

  fn.log = true;
  fn.module = __dirname;
  fn.handler = fn;

  // TODO: Fix this
  /* istanbul ignore next */
  const { LIGHT_ENVIRONMENT } = process.env;
  const isAWS: boolean = LIGHT_ENVIRONMENT === 'aws';
  /* istanbul ignore if */
  if (isAWS) {
    return AWSServerlessMicro(fn);
  }

  const isRunKit = !!(process.env.LIGHT_ENVIRONMENT && process.env.LIGHT_ENVIRONMENT.toLowerCase() === 'runkit');
  if (isRunKit) {
    return {
      endpoint: fn,
    };
  }

  return fn;
};
