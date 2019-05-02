import { run } from 'micro';
import { IncomingMessage, ServerResponse } from 'http';
import AWSServerlessMicro from 'aws-serverless-micro';
import pino from 'pino-http';

interface Route {
  path?: string;
  middleware?: string[];
  handler: Handler;
}

// TODO: Define types for micro and aws
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

    const isAWS: boolean = !!(
      (process.env.LAMBDA_TASK_ROOT && process.env.AWS_EXECUTION_ENV) || false
    );
    if (isAWS) {
      return AWSServerlessMicro(exec)
    }
    return run(Req, Res, exec);
  }

  fn.path = route.path;
  fn.log = true;
  fn.module = __dirname;
  fn.handler = fn;

  return fn;
};
