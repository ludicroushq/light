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

class Light {
  public server: any; // eslint-disable-line
  public router: any; // eslint-disable-line

  public constructor({
    routes: routesPath,
  }: {
    routes: string | string[];
  }) {
    this.router = new Router();
    this.server = micro((req, res): () => {} => this.router.handle(req, res));

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

    routes.forEach((route: Route): void => {
      let handler;
      try {
        handler = require(route.path); // eslint-disable-line
        if (handler.default) {
          handler = handler.default;
        }
      } catch (err) {
        throw new Error(`unable to import route ${route.path}\n${err.stack}`);
      }

      if (isFunction(handler)) {
        const { name, dir } = parse(route.name);
        const path = join('/', dir, name === 'index' ? '/' : name);
        this.router.get(path, handler);
        this.router.post(path, handler);
        this.router.put(path, handler);
        this.router.patch(path, handler);
        this.router.delete(path, handler);
        this.router.options(path, handler);
        this.router.trace(path, handler);
        return;
      }

      let router = handler;

      if (isPlainObject(handler)) {
        router = {
          ...handler,
        };
      }

      if (!router.handler) {
        throw new Error('missing handler');
      }
      if (!router.method) {
        router.method = 'GET'; // default to GET
      }
      router.method = router.method.toUpperCase();
      if (!router.path) {
        const { name, dir } = parse(route.name);
        router.path = join(dir, name);
      }
      if (router.path) {
        router.path = join('/', router.path);
      }

      this.router.route(router);
    });
  }
}

export default Light;
