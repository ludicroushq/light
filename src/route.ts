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
  const fn = (Req: IM, Res: SR): AP => run(Req, Res, async (req: IM, res: SR): AP => {
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
  });

  fn.path = route.path;
  fn.log = true;
  fn.module = __dirname;

  const isAWS: boolean = !!(
    (process.env.LAMBDA_TASK_ROOT && process.env.AWS_EXECUTION_ENV) || false
  );
  if (isAWS) {
    return {
      handler: AWSServerlessMicro(fn),
    };
  }

  const isGCP: boolean = !!(process.env.X_GOOGLE_FUNCTION_NAME || false);
  if (isGCP) {
    return {
      handler: fn,
    };
  }

  return fn;
};
