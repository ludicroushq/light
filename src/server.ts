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
  routes: routesPath,
  log = true,
}: {
  routes: string | string[];
  log?: boolean;
}): Light => {
  const router = Router({
    ignoreTrailingSlash: true,
  });

  const server = micro(async (req: IM, res: SR): Promise<any> => router.lookup(req, res));

  const routes = findRoutes(routesPath);

  routes.forEach((route: Route): void => {
    importRoute(router, route, {
      log,
    });
  });

  return {
    router,
    server,
  };
};

export default light;
