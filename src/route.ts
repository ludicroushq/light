import { run } from 'micro';
import { join } from 'path';
import { IncomingMessage, ServerResponse } from 'http';

interface Route {
  path?: string;
  middleware?: string[];
  handler: Handler;
}

type Handler = (req: IncomingMessage, res: ServerResponse) => {};
type IM = IncomingMessage;
type SR = ServerResponse;
type AP = Promise<any>;

export default (route: Route): Handler => {
  const fn = (Req: IM, Res: SR): AP => run(Req, Res, async (req: IM, res: SR): AP => {
    const importMiddleware = (path: string): any => {
      let mw = require(path); // eslint-disable-line
      if (mw.default) {
        mw = mw.default;
      }
      return mw;
    };

    const middleware: any[] = route.middleware || [];

    if (fn.log !== false) {
      const logger = importMiddleware(join(fn.module, 'middleware/logger'));
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
  return fn;
};
