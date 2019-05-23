import {
  join, relative, basename,
} from 'path';
import { lstatSync } from 'fs';
import Route from '../types/route';
import glob from './glob';

export default (routesPath: string | string[]): Route[] => {
  const routes: Route[] = [];

  const addRoutes = (path: string): number => {
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
