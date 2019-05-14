import { run } from 'micro';
import { IncomingMessage, ServerResponse } from 'http';
import AWSServerlessMicro from 'aws-serverless-micro';
import pino from 'pino-http';
import { handleErrors } from 'micro-boom';

const isProd = process.env.NODE_ENV === 'production';

let Youch: any;
let forTerminal: any;
if (!isProd) {
  Youch = require('youch'); // eslint-disable-line
  forTerminal = require('youch-terminal'); // eslint-disable-line
}

/* istanbul ignore next */
const pinoOptions = isProd ? {} : {
  prettyPrint: true,
};
const logger = pino(pinoOptions);

interface Route {
  path?: string;
  middleware?: any[];
  plugins?: any[];
  method?: string[] | string;
  handler: Handler;
}

// TODO: Define types for micro and aws
// TODO: Add test for POST/other methods
type Handler = any;
type IM = IncomingMessage;
type SR = ServerResponse;
type AP = Promise<any>;

export default (route: Route): Handler => {
  const fn = (Req: IM, Res: SR): AP => {
    let exec = async (req: IM, res: SR): AP => {
      const middleware: any[] = route.middleware || [];

      if (fn.log !== false) {
        middleware.unshift(logger);
        fn.log = false;
      }

      for (const mw of middleware) { // eslint-disable-line
        await mw(req, res); // eslint-disable-line

        if (res.headersSent) {
          return null;
        }
      }

      return route.handler(req, res);
    };

    if (route.plugins) {
      exec = route.plugins.reverse().reduce((acc, val): any => val(acc), exec);
    }

    const youchErrors = (fun: any): any => async (req: IM, res: SR): Promise<void> => {
      try {
        return await fun(req, res);
      } catch (err) {
        if (!isProd) {
          const youch = new Youch(err, req);
          const json = await youch.toJSON();
          console.log(forTerminal(json)); // eslint-disable-line
        }
        throw err;
      }
    };

    // TODO: Fix this
    /* istanbul ignore next */
    const isAWS: boolean = !!(process.env.LIGHT_ENVIRONMENT && process.env.LIGHT_ENVIRONMENT.toLowerCase() === 'aws');
    /* istanbul ignore if */
    if (isAWS) {
      return AWSServerlessMicro(handleErrors(exec));
    }

    return run(Req, Res, handleErrors(youchErrors(exec)));
  };

  Object.keys(route).forEach((key): void => {
    (fn as any)[key] = (route as any)[key];
  });

  fn.log = true;
  fn.module = __dirname;
  fn.handler = fn;

  const isRunKit: boolean = !!(process.env.LIGHT_ENVIRONMENT && process.env.LIGHT_ENVIRONMENT.toLowerCase() === 'runkit');
  if (isRunKit) {
    return {
      endpoint: fn,
    };
  }

  return fn;
};
