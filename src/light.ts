import micro from 'micro';
import Router from 'micro-http-router';
import isFunction from 'lodash.isfunction';
import isArray from 'lodash.isarray';
import {
  join, relative, parse, basename,
} from 'path';
import { lstatSync } from 'fs';
import { IncomingMessage, ServerResponse, Server } from 'http';

import logger from './middleware/logger';
import glob from './utils/glob';

interface Route {
  path: string;
  name: string;
}

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

  const middlewares: handler[] = [];
  if (log !== false) {
    middlewares.push(logger);
  }

  type a = Promise<any>;
  const mw = (handler: handler): any => async (req: IncomingMessage, res: ServerResponse): a => {
    for (const middleware of middlewares) {  // eslint-disable-line
      await middleware(req, res); // eslint-disable-line
    }
    return handler(req, res);
  };

  routes.forEach((routeData: Route): void => {
    let handler: ((req: IncomingMessage, res: ServerResponse) => {}) | any;
    try {
      handler = require(routeData.path); // eslint-disable-line
      if (handler.default) {
        handler = handler.default;
      }
    } catch (err) {
      throw new Error(`unable to import route ${routeData.path}\n${err.stack}`);
    }

    if (isFunction(handler) && !(handler as any).path) {
      const { name, dir } = parse(routeData.name);
      const path = join('/', dir, name === 'index' ? '/' : name);
      const handle = mw(handler);
      router.get(path, handle);
      router.post(path, handle);
      router.put(path, handle);
      router.patch(path, handle);
      router.delete(path, handle);
      router.options(path, handle);
      router.trace(path, handle);
      return;
    }

    let route: ((req: IncomingMessage, res: ServerResponse) => {}) | any = {};
    if (!handler.handler) {
      route.handler = handler;
      route.path = (handler as any).path;
    } else {
      route = {
        ...handler,
      };
    }

    route.handler = mw(route.handler);

    if (!route.method) {
      route.method = 'GET'; // default to GET
    }
    route.method = route.method.toUpperCase();

    if (!route.path) {
      const { name, dir } = parse(routeData.name);
      route.path = join(dir, name);
    }
    route.path = join('/', route.path);

    router.route(route);
  });

  return {
    router,
    server,
  };
};

export default light;
