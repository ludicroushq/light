import micro from 'micro';
import Router from 'micro-http-router-query-params';
import { IncomingMessage, ServerResponse, Server } from 'http';
import findRoutes from './utils/find-routes';
import Route from './types/route';
import importRoute from './utils/import-route';

interface Light {
  server: Server;
  router: any;
}

const light = ({
  routes: routesPath,
  log = true,
}: {
  routes: string | string[];
  log?: boolean;
}): Light => {
  const router = new Router();

  const server = micro((req: IncomingMessage, res: ServerResponse): any => router.handle(req, res));

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
