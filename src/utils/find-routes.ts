import { join } from 'path';
import { existsSync } from 'fs';

import { RouteObject } from '../types/route';
import glob from './glob';

/**
 * Find all of the routes from either the routes file or the fs
 *
 * @param {string} routesPath - the absolute path to the routes
 * @returns {RouteObject} an array of objects with handler
 */
export default (routesPath: string): RouteObject[] => {
  // try to find the routes file
  const routesFilePath = join(routesPath, '../', 'routes.js');

  // if it exists then use the routes from there
  if (existsSync(routesFilePath)) {
    const routerRoutes = require(routesFilePath) || []; // eslint-disable-line
    const mappedRoutes = routerRoutes.map((r: any): any => ({
      ...r,
      handler: join(routesPath, r.handler),
    }));
    return mappedRoutes;
  }
  const routes: string[] = [];
  const addRoutes = (path: any): number => {
    const files: string[] = glob(join('/', path), '**/*.{js,ts}');
    return routes.push(...files);
  };

  addRoutes(routesPath);

  return routes.map((s: string): RouteObject => ({ handler: s }));
};
