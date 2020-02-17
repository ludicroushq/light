import { join, parse } from 'path';
import { IM, SR, AP } from '../../src/types/http';

import { RouteObject, Options } from '../../src/types/route';

/**
 * adds route to the router
 */
export default (router: any, route: RouteObject, opts?: Options): void => {
  const endpoint = route;

  if (typeof endpoint.path === 'string') {
    endpoint.path = [endpoint.path];
  }

  /* istanbul ignore next */
  endpoint.path = (endpoint.path || []).map((p: string): string => {
    const { name, dir } = parse(p);
    return join('/', dir, name);
  });

  // if the path is /index, map it to the root route as well
  if (endpoint.path.includes('/index')) {
    endpoint.path.push('/');
  }

  if (!endpoint.method) {
    endpoint.method = ['GET']; // default to GET
  }

  if (!Array.isArray(endpoint.method)) {
    endpoint.method = [endpoint.method];
  }

  endpoint.method = endpoint.method.map((m: string): string => m.toUpperCase());

  endpoint.path.forEach((path: string): void => {
    router.on(
      endpoint.method,
      path,
      (req: IM, res: SR): AP => endpoint.handler(req, res, opts),
    );
  });
};
