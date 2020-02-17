import { join } from 'path';
import { existsSync } from 'fs';

import { RouteObject } from '../../src/types/route';
import glob from './glob';

/**
 * Find all of the routes from either the routes file or the fs
 *
 * @param {string} routesPath - the absolute path to the routes
 * @returns {RouteObject} an array of objects with handler
 */
export default (routesPath: string): RouteObject[] => {
  // try to find the routes file
  const routesFilePathJS = join(routesPath, '../', 'routes.js');
  const routesFilePathTS = join(routesPath, '../', 'routes.ts');

  // if it exists then use the routes from there
  if (existsSync(routesFilePathJS) || existsSync(routesFilePathTS)) {
    let routerRoutes;
    /* istanbul ignore next */
    if (existsSync(routesFilePathJS)) {
      routerRoutes = require(routesFilePathJS) || []; // eslint-disable-line
    } else {
      routerRoutes = require(routesFilePathTS) || []; // eslint-disable-line
    }
    const mappedRoutes = routerRoutes.map((r: any): any => ({
      ...r,
      handler: join(routesPath, r.handler),
    }));
    return mappedRoutes;
  }
  const routes: string[] = [];
  const addRoutes = (path: any): number => {
    const files: string[] = glob(join('/', path), '**/*.{js,ts}');
    const filteredFiles = files.filter((x: string): boolean => !x.includes('__tests__'));
    return routes.push(...filteredFiles);
  };

  addRoutes(routesPath);

  return routes.map((s: string): RouteObject => ({ handler: s }));
};
