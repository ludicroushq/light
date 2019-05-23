import {
  join, parse,
} from 'path';
import isFunction from 'lodash.isfunction';
import { IncomingMessage, ServerResponse } from 'http';
import logger from './logger';

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
    logger.error(`unable to import route ${routeData.path}`);
    logger.fatal(err);
    return;
  }

  if (isFunction(handler) && !(handler as any).path) {
    const { name, dir } = parse(routeData.name);
    const path = join('/', dir, name === 'index' ? '/' : name);
    (handler as any).log = opts.log;
    router.all(path, handler);
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
    route.method = ['GET']; // default to GET
  }

  if (!Array.isArray(route.method)) {
    route.method = [route.method];
  }

  route.method = route.method.map((m: string): string => m.toUpperCase());

  route.path.forEach((path: string): void => {
    router.on(route.method, path, route.handler);
  });
};
