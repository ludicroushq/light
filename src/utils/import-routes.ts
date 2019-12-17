import { METHODS, IncomingMessage } from 'http';
import { relative } from 'path';

import Youch from 'youch';
import forTerminal from 'youch-terminal';

import RouteType from '../types/route';
import { route } from '../index';

export default (routes: any[], routesPath: string, safe: boolean = false): RouteType[] => {
  let results: RouteType[] = [];

  try {
    results = routes.map((r: any): RouteType => {
      let handler;
      handler = require(r.handler); // eslint-disable-line
      if (handler.default) {
        handler = handler.default;
      }

      const path = r.path || relative(routesPath, r.handler);
      const method = r.method || METHODS;

      return {
        file: r.handler,
        method,
        handler,
        path,
      };
    });
  } catch (err) {
    if (!safe) {
      throw err;
    }

    const { handler } = route();

    results.push({
      method: METHODS,
      handler: handler(async (req: IncomingMessage): Promise<any> => {
        const youch = new Youch(err, req);
        const json = await youch.toJSON();
        console.log(forTerminal(json)); // eslint-disable-line
        return youch.toHTML();
      }),
      path: '*',
    });
  }

  return results;
};
