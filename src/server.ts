import micro from 'micro';
import Router from 'find-my-way';
import { IncomingMessage, ServerResponse, Server } from 'http';
import findRoutes from './utils/find-routes';
import Route from './types/route';
import importRoute from './utils/import-route';

interface Light {
  server: Server;
  router: any;
}

type IM = IncomingMessage;
type SR = ServerResponse;

const light = ({
  routes,
}: {
  routes: string[] | any[];
}): Light => {
  const router = Router({
    ignoreTrailingSlash: true,
  });

  const server = micro(async (req: IM, res: SR): Promise<any> => router.lookup(req, res));

  // const routes = findRoutes(routesPath);

  routes.forEach((route: any): void => {
    // importRoute(router, route, {
    //   log: true,
    // });
    router.on(route.method, route.path, route.handler);
  });

  return {
    router,
    server,
  };
};

export default light;
