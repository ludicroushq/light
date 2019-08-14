import {
  join, relative, basename,
} from 'path';
import { lstatSync } from 'fs';
import Route from '../types/route';
import glob from './glob';

export default (routesPath: string | any[] | any): Route[] => {
  const routes: Route[] = [];

  const addRoutes = (path: any): number => {
    if (typeof path !== 'string') {
      return routes.push({
        handler: path,
      });
    }

    if (lstatSync(path).isFile()) {
      return routes.push({
        path,
        name: basename(path),
      });
    }

    const files: string[] = glob(join('/', path), '**/*.{js,ts}');
    return routes.push(...files.map((r: string): Route => ({
      path: r,
      name: relative(path, r),
    })));
  };

  if (Array.isArray(routesPath)) {
    routesPath.forEach((r): number => addRoutes(r));
  } else {
    addRoutes(routesPath);
  }

  return routes;
};
