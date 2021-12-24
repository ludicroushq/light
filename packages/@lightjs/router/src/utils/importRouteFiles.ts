import { join, parse } from 'path';
import { ImportedRoute } from '@lightjs/types';
import { convertFileNameToPath } from './convertFileNameToPath';

export function importRouteFiles(routes: string[], rootPath: string) {
  const routesDir = join(rootPath, './routes');

  const routeObjects: ImportedRoute[] = [];
  routes.forEach((route: string): void => {
    const routePath = join(routesDir, route);

    let handler = require(routePath); // eslint-disable-line
    if (handler.default) {
      handler = handler.default;
    }

    if (!handler) throw new Error(`${route} does not export a handler`);

    const parsedFile = parse(join('/', route));
    const fileName = join(parsedFile.dir, parsedFile.name);

    const path = convertFileNameToPath(fileName);

    routeObjects.push({
      path,
      route: handler,
      file: routePath,
    });
  });

  return routeObjects;
}
