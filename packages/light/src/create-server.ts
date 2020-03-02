import micro from 'micro';
import Router from 'find-my-way';

import injectRoutes from './utils/inject-routes';

import { Route, Options } from './types/route';
import { IM, SR } from './types/http';
import { LightServer } from './types/server';
// import { Config } from './types/config';

export default ({
  routes,
  opts,
  // config,
}: {
  routes: Route[];
  opts?: Options;
  // config?: Config;
}): LightServer => {
  // create find-my-way router with default 404 handler
  const router = Router({
    ignoreTrailingSlash: true,
    defaultRoute: (_: IM, res: SR): void => {
      res.statusCode = 404;
      res.end('Not Found');
    },
  });

  injectRoutes(router, routes, opts);

  // create the http server
  const server = micro(async (req: IM, res: SR): Promise<any> => router.lookup(req, res));

  return {
    router,
    server,
  };
};
