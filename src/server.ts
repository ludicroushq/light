import micro from 'micro';
import Router from 'find-my-way';
import { IncomingMessage, ServerResponse, Server } from 'http';

import findRoutes from './utils/find-routes';
import RouteType from './types/route';
import importRoutes from './utils/import-routes';
import addRoute from './utils/add-route';
import glob from './global';

// TODO: move interfaces to global file
// TODO: clean up
interface Light {
  server: Server;
  router: any;
}

type IM = IncomingMessage;
type SR = ServerResponse;

// TODO: change opts type to the Options type in route.ts
const app = ({
  routes,
  opts,
}: {
  routes: string | RouteType[];
  opts?: any;
}): Light => {
  const g = glob();
  (global as any).light = g;
  const router = Router({
    ignoreTrailingSlash: true,
    defaultRoute: (req: IncomingMessage, res: ServerResponse): void => {
      res.statusCode = 404;
      res.end('Not Found');
    },
  });

  let routeObjs: RouteType[] = [];

  if (typeof routes === 'string') {
    const files: any[] = findRoutes(routes);
    routeObjs = importRoutes(files, routes);
  } else {
    routeObjs = routes;
  }

  const server = micro(async (req: IM, res: SR): Promise<any> => router.lookup(req, res));

  routeObjs.forEach((route: RouteType): void => {
    addRoute(router, route, opts);
  });

  return {
    router,
    server,
  };
};

export default app;
