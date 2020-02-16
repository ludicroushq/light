import micro from 'micro';
import Router from 'find-my-way';

import { IM, SR } from './types/http';
import { LightServer } from './types/server';
import { RouteObject, Options } from './types/route';

import findRoutes from './utils/find-routes';
import importRoutes from './utils/import-routes';
import addRoute from './utils/add-route';
import globalRegister from './global';

export default ({
  routes,
  opts,
}: {
  routes: string | RouteObject[];
  opts?: Options;
}): LightServer => {
  // register global variables
  const g = globalRegister();
  (global as any).light = g;

  // create find-my-way router with default 404 handler
  const router = Router({
    ignoreTrailingSlash: true,
    defaultRoute: (_: IM, res: SR): void => {
      res.statusCode = 404;
      res.end('Not Found');
    },
  });

  let routeObjs: RouteObject[] = [];

  if (typeof routes === 'string') {
    const files: RouteObject[] = findRoutes(routes);
    routeObjs = importRoutes(files, routes);
  } else {
    routeObjs = routes;
  }

  const server = micro(async (req: IM, res: SR): Promise<any> => router.lookup(req, res));

  routeObjs.forEach((route: RouteObject): void => {
    addRoute(router, route, opts);
  });

  return {
    router,
    server,
  };
};
