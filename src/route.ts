import { send } from 'micro';
import { join } from 'path';
import { IncomingMessage, ServerResponse } from 'http';

interface R {
  path?: string;
  handler: (req: IncomingMessage, res: ServerResponse) => {};
}

interface Opts {
  middleware?: string[];
  middlewareRoot?: string;
}

export default (route: R, opts: Opts = {}): (req: IncomingMessage, res: ServerResponse) => {} => {
  const fn = async (req: IncomingMessage, res: ServerResponse): Promise<any> => {
    const root = join(fn.module, '../', opts.middlewareRoot || 'middleware');
    const middlewarePaths: string[] = [];

    if (fn.log !== false) {
      middlewarePaths.push(join(fn.module, 'middleware/logger'));
    }

    (opts.middleware || []).forEach((mw): void => {
      middlewarePaths.push(join(root, mw));
    });

    const middleware = middlewarePaths.map((mwPath): any => {
      try {
        let mw = require(mwPath); // eslint-disable-line
        if (mw.default) {
          mw = mw.default;
        }
        return mw;
      } catch (err) {
        console.log(err); // eslint-disable-line
      }
      return (): void => {};
    });

    for (const mw of middleware) { // eslint-disable-line
      await mw(req, res); // eslint-disable-line
    }
    const ret = await route.handler(req, res);
    if (ret) {
      send(res, 200, ret);
    }
  };

  fn.path = route.path;
  fn.log = true;
  fn.module = __dirname;
  return fn;
};
