import { send } from 'micro';
import { IncomingMessage, ServerResponse } from 'http';

const middleware: any = {
  async logger(req: IncomingMessage, res: ServerResponse): Promise<any> {
    let lg = require('./middleware/logger'); // eslint-disable-line
    if (lg.default) {
      lg = lg.default;
    }
    return lg(req, res);
  },
};

interface Route {
  path?: string;
  handler: (req: IncomingMessage, res: ServerResponse) => {};
}

export default (route: Route): (req: IncomingMessage, res: ServerResponse) => {} => {
  const fn = async (req: IncomingMessage, res: ServerResponse): Promise<any> => {
    for (const mwKey in middleware) { // eslint-disable-line
      if (fn.log !== false || mwKey !== 'logger') {
        const mw = middleware[mwKey];
        await mw(req, res); // eslint-disable-line
      }
    }
    const ret = await route.handler(req, res);
    if (ret) {
      send(res, 200, ret);
    }
  };

  fn.path = route.path;
  fn.log = true;
  return fn;
};
