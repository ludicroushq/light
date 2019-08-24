import micro from 'micro';
import Router from 'find-my-way';
import { IncomingMessage, ServerResponse, Server } from 'http';
import findRoutes from './utils/find-routes';
import Route from './types/route';
import importRoutes from './utils/import-routes';
import addRoute from './utils/add-route';

interface Light {
  server: Server;
  router: any;
}

type IM = IncomingMessage;
type SR = ServerResponse;

const light = ({
  routes,
}: {
  routes: string | Route[];
}): Light => {
  const router = Router({
    ignoreTrailingSlash: true,
  });

  let routeObjs: Route[] = [];
  if (typeof routes === 'string') {
    const files: string[] = findRoutes(routes);
    routeObjs = importRoutes(files, routes);
  }

  const server = micro(async (req: IM, res: SR): Promise<any> => router.lookup(req, res));

  routeObjs.forEach((route: Route): void => {
    addRoute(router, route);
  });

  return {
    router,
    server,
  };
};

export default light;
