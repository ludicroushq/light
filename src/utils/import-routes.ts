import { METHODS } from 'http';
import { relative } from 'path';

import Youch from 'youch';
import forTerminal from 'youch-terminal';

import RouteType from '../types/route';
import { light, Route } from '../index';

export default (routes: string[], routesPath: string, safe: boolean = false): RouteType[] => {
  let results: RouteType[] = [];

  try {
    results = routes.map((route: string): RouteType => {
      let handler;
        handler = require(route); // eslint-disable-line
      if (handler.default) {
        handler = handler.default;
      }

      const path = relative(routesPath, route);

      return {
        file: route,
        method: METHODS,
        handler,
        path,
      };
    });
  } catch (err) {
    if (!safe) {
      throw err;
    }

    results.push({
      method: METHODS,
      handler: light(class Index extends Route {
        public async handler(): Promise<any> {
          const youch = new Youch(err, this.req);
          const json = await youch.toJSON();
          console.log(forTerminal(json)); // eslint-disable-line
          return youch.toHTML();
        }
      }),
      path: '*',
    });
  }

  return results;
};
