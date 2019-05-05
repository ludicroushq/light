import { run, send } from 'micro';
import { IncomingMessage, ServerResponse } from 'http';
import AWSServerlessMicro from 'aws-serverless-micro';
import pino from 'pino-http';

const { NODE_ENV } = process.env;
const DEV = NODE_ENV === 'development';

interface Route {
  path?: string;
  middleware?: string[];
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
    const exec = async (req: IM, res: SR): AP => {
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

    const handleErrors = (hndlr: any): any => async (req: IM, res: SR): AP => {
      try {
        return await hndlr(req, res);
      } catch (errorObj) {
        const statusCode = errorObj.statusCode || errorObj.status || 500;
        const message = statusCode ? errorObj.message : 'Internal Server Error';
        if (errorObj instanceof Error) {
          console.error(errorObj.stack); // eslint-disable-line
        } else {
          console.warn('thrown error must be an instance Error'); // eslint-disable-line
        }
        return send(res, statusCode, DEV ? errorObj.stack : { statusCode, message });
      }
    };

    const isAWS: boolean = !!(
      (process.env.LAMBDA_TASK_ROOT && process.env.AWS_EXECUTION_ENV) || false
    );
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
