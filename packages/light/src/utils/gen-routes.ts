
import { join, parse } from 'path';

import { Route } from '../types/route';

export default (routes: string[], rootPath: string): Route[] => {
  const routesDir = join(rootPath, './routes');

  const routeObjects: Route[] = [];
  routes.forEach((route: string): void => {
    const routePath = join(routesDir, route);

    let handler = require(routePath); // eslint-disable-line
    if (handler.default) {
      handler = handler.default;
    }

    const parsedFile = parse(join('/', route));
    const fileName = join(parsedFile.dir, parsedFile.name);

    const path = fileName.split('/').map((x): string => {
      if (x.startsWith('[') && x.endsWith(']')) {
        const newName = x.split('');
        newName.pop();
        newName.shift();
        return `:${newName.join('')}`;
      }
      return x;
    }).join('/');

    if (path === '/index') {
      routeObjects.push({
        path: '/',
        handler,
        location: routePath,
      });
    }

    routeObjects.push({
      path,
      handler,
      location: routePath,
    });
  });

  return routeObjects;
};
