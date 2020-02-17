import micro from 'micro';
import Router from 'find-my-way';

import injectRoutes from './utils/inject-routes';
import globalRegister from './global';

import { Route } from './types/route';
import { IM, SR } from './types/http';
import { LightServer } from './types/server';

export default ({
  routes,
}: {
  routes: Route[];
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

  injectRoutes(router, routes);

  // create the http server
  const server = micro(async (req: IM, res: SR): Promise<any> => router.lookup(req, res));

  return {
    router,
    server,
  };
};
