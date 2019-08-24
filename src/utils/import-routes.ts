import { relative } from 'path';
import { METHODS } from 'http';

import logger from './logger';
import Route from '../types/route';

export default (routes: string[], routesPath: string): Route[] => routes.map(
  (route: string): Route => {
    let handler;
    try {
        handler = require(route); // eslint-disable-line
      if (handler.default) {
        handler = handler.default;
      }
    } catch (err) {
      logger.error(`unable to import route ${route}`);
      logger.fatal(err);
      throw new Error('please fix the route and try again');
    }

    const path = relative(routesPath, route);

    return {
      file: route,
      method: METHODS,
      handler,
      path,
    };
  },
);
