import { join, parse } from 'path';
import { RouteObject } from '@lightjs/types';
import { convertFileNameToPath } from './convert-file-name-to-path';

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

    console.log('this is new');

    const path = convertFileNameToPath(fileName);

    routeObjects.push({
      path,
      route: handler,
      file: routePath,
    });
  });

  return routeObjects;
};
