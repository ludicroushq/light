import micro from 'micro';
import Router from 'micro-http-router';
import isArray from 'lodash.isarray';
import {
  join, relative, basename,
} from 'path';
import { lstatSync } from 'fs';
import { IncomingMessage, ServerResponse, Server } from 'http';
import glob from './utils/glob';
import Route from './types/route';
import importRoute from './utils/import-route';

interface Light {
  server: Server;
  router: any;
}

type handler = (req: IncomingMessage, res: ServerResponse) => any;

const light = ({
  routes: routesPath,
  log,
}: {
  routes: string | string[];
  log?: boolean | any;
}): Light => {
  const router = new Router();

  const server = micro((req: IncomingMessage, res: ServerResponse): any => router.handle(req, res));

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

  if (isArray(routesPath)) {
    routesPath.forEach((r): number => addRoutes(r));
  } else {
    addRoutes(routesPath);
  }

  routes.forEach((route: Route): void => {
    importRoute(router, route, {
      log,
    });
  });

  return {
    router,
    server,
  };
};

export default light;
