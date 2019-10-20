import { METHODS, IncomingMessage } from 'http';
import { relative } from 'path';

import Youch from 'youch';
import forTerminal from 'youch-terminal';

import RouteType from '../types/route';
import { route } from '../index';

export default (routes: string[], routesPath: string, safe: boolean = false): RouteType[] => {
  let results: RouteType[] = [];

  try {
    results = routes.map((r: string): RouteType => {
      let handler;
        handler = require(r); // eslint-disable-line
      if (handler.default) {
        handler = handler.default;
      }

      const path = relative(routesPath, r);

      return {
        file: r,
        method: METHODS,
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
