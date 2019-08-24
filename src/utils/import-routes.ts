import { relative } from 'path';
import { METHODS } from 'http';

import logger from './logger';
import Route from '../types/route';

export default (routes: string[], routesPath: string): Route[] => {
  const Routes: Route[] = [];

  routes.forEach((route: string) => {
    let handler;
    try {
      handler = require(route); // eslint-disable-line
      if (handler.default) {
        handler = handler.default;
      }
    } catch (err) {
      logger.error(`unable to import route ${route}`);
      logger.fatal(err);
      return;
    }

    const path = relative(routesPath, route);

    Routes.push({
      file: route,
      method: METHODS,
      handler,
      path,
    });
  })

  return Routes;
};
