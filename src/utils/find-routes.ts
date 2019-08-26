import { join } from 'path';
import glob from './glob';

export default (routesPath: string): string[] => {
  const routes: string[] = [];

  const addRoutes = (path: any): number => {
    const files: string[] = glob(join('/', path), '**/*.{js,ts}');
    return routes.push(...files);
  };

  addRoutes(routesPath);

  return routes;
};
