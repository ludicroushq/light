import {
  join, parse,
} from 'path';
import isFunction from 'lodash.isfunction';
import { IncomingMessage, ServerResponse } from 'http';
import log from '../cli/utils/log';

import Route from '../types/route';

interface Options {
  log: boolean;
}

export default (router: any, routeData: Route, opts: Options): void => {
  let handler: ((req: IncomingMessage, res: ServerResponse) => {}) | any;
  try {
    handler = require(routeData.path); // eslint-disable-line
    if (handler.default) {
      handler = handler.default;
    }
  } catch (err) {
    log('error', `unable to import route ${routeData.path}\n${err.stack}`, {
      titleColor: 'red',
    });
    return;
  }

  if (isFunction(handler) && !(handler as any).path) {
    const { name, dir } = parse(routeData.name);
    const path = join('/', dir, name === 'index' ? '/' : name);
    router.get(path, handler);
    router.post(path, handler);
    router.put(path, handler);
    router.patch(path, handler);
    router.delete(path, handler);
    router.options(path, handler);
    router.trace(path, handler);
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

  if (!route.path) {
    const { name, dir } = parse(routeData.name);
    route.path = join(dir, name);
  }

  if (!Array.isArray(route.path)) {
    route.path = [route.path];
  }

  route.path = route.path.map((p: string): string => join('/', p));

  route.handler.log = opts.log;

  if (!route.method) {
    route.method = 'GET'; // default to GET
  }
  route.method = route.method.toUpperCase();

  route.path.forEach((path: string): void => {
    const obj = {
      ...route,
    };
    obj.path = path;
    router.route(obj);
  });
};
