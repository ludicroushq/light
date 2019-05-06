import { run } from 'micro';
import { IncomingMessage, ServerResponse } from 'http';
import AWSServerlessMicro from 'aws-serverless-micro';
import pino from 'pino-http';
import { handleErrors } from 'micro-boom';

interface Route {
  path?: string;
  middleware?: any[];
  plugins?: any[];
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
        const pinoOptions = process.env.NODE_ENV === 'production' ? {} : {
          prettyPrint: {
            levelFirst: true,
          },
        };
        const logger = pino(pinoOptions);
        middleware.unshift(logger);
      }

      for (const mw of middleware) { // eslint-disable-line
        await mw(req, res); // eslint-disable-line
      }

      return route.handler(req, res);
    };

    if (route.plugins) {
      exec = route.plugins.reverse().reduce((acc, val): any => val(acc), exec);
    }

    const isAWS: boolean = process.env.LIGHT_ENVIRONMENT === 'aws';
    if (isAWS) {
      return AWSServerlessMicro(handleErrors(exec));
    }
    return run(Req, Res, handleErrors(exec));
  };

  Object.keys(route).forEach((key): void => {
    (fn as any)[key] = (route as any)[key];
  });
  fn.log = true;
  fn.module = __dirname;
  fn.handler = fn;

  return fn;
};
