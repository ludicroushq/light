import micro from 'micro';
import Router from 'micro-http-router';
import * as fg from 'fast-glob';
import isFunction from 'lodash.isfunction';
import isPlainObject from 'lodash.isplainobject';
import isArray from 'lodash.isarray';
import {
  join, relative, parse, basename,
} from 'path';
import { lstatSync } from 'fs';

interface Route {
  path: string;
  name: string;
}

const light = ({
  routes: routesPath,
}: {
  routes: string | string[];
}) => {
  const router = new Router();
  const server = micro((req, res): () => {} => router.handle(req, res));

  const routes: Route[] = [];

  const addRoutes = (path: string): number => {
    if (lstatSync(path).isFile()) {
      return routes.push({
        path,
        name: basename(path),
      });
    }
    const files: string[] = fg.sync(join(path, '**/*.{js,ts}'));
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

  routes.forEach((routeData: Route): void => {
    let handler: any;
    try {
      handler = require(routeData.path); // eslint-disable-line
      if (handler.default) {
        handler = handler.default;
      }
    } catch (err) {
      throw new Error(`unable to import route ${routeData.path}\n${err.stack}`);
    }

    let route = handler;

    if (isFunction(route)) {
      if (!(route as any).path) {
        const { name, dir } = parse(routeData.name);
        const path = join('/', dir, name === 'index' ? '/' : name);
        router.get(path, route);
        router.post(path, route);
        router.put(path, route);
        router.patch(path, route);
        router.delete(path, route);
        router.options(path, route);
        router.trace(path, route);
        return;
      }

      (route as any).handler = handler;
    }

    if (isPlainObject(handler)) {
      route = {
        ...handler,
      };
    }

    if (!route.handler) {
      throw new Error('missing handler');
    }
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
    server
  };
}



export default light;
