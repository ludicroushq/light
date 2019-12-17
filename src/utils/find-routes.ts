import { join } from 'path';
import { existsSync } from 'fs';
import glob from './glob';

export default (routesPath: string): any[] => {
  const routesFilePath = join(routesPath, '../', 'routes.js');
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

  return routes.map((s: string): any => ({ handler: s }));
};
