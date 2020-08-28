import { join, parse } from 'path';
import { RouteObject } from '../types/route';

export default (routes: string[], rootPath: string): RouteObject[] => {
  const routesDir = join(rootPath, './routes');

  const routeObjects: RouteObject[] = [];
  routes.forEach((route: string): void => {
    const routePath = join(routesDir, route);

    let handler = require(routePath); // eslint-disable-line
    if (handler.default) {
      handler = handler.default;
    }

    const parsedFile = parse(join('/', route));
    const fileName = join(parsedFile.dir, parsedFile.name);

    const path = fileName
      .split('/')
      .map((x): string => {
        if (x.startsWith('[') && x.endsWith(']')) {
          const newName = x.split('');
          newName.pop();
          newName.shift();
          return `:${newName.join('')}`;
        }
        return x;
      })
      .join('/');

    if (path.endsWith('/index')) {
      routeObjects.push({
        path: path.substring(0, path.length - 6) || '/',
        handler,
        file: routePath,
      });
      return;
    }

    routeObjects.push({
      path,
      handler,
      file: routePath,
    });
  });

  return routeObjects;
};
