import micro, { createError } from 'micro';
import Router from 'find-my-way';
import { join } from 'path';
import { IncomingMessage, ServerResponse } from 'http';
import { importLightConfig } from './utils/import-config';
import genRoutes from './utils/gen-routes';
import findRoutes from './utils/find-routes';
import { LightServer } from './types/server';
import injectRoutes from './utils/inject-routes';

export default (): LightServer => {
  // create find-my-way router with default 404 handler
  const defaultRoute = (): void => {
    throw createError(404, 'Not Found');
  };

  const router = Router({
    ignoreTrailingSlash: true,
    defaultRoute,
  });

  const cwd = process.cwd();
  const config = importLightConfig();
  const rootPath = join(cwd, config.root ? config.root : './');
  const routeFiles = findRoutes(rootPath);

  const fillRouter = () => {
    const generatedRoutes = genRoutes(routeFiles, rootPath);

    injectRoutes(router, generatedRoutes);

    return generatedRoutes;
  };
  const generatedRoutes = fillRouter();

  // create the http server
  const server = micro(async (req: IncomingMessage, res: ServerResponse) =>
    router.lookup(req, res),
  );

  return {
    router,
    generatedRoutes,
    reload: () => {
      // reset the router
      router.reset();
      // reimport routes
      return fillRouter();
    },
    server,
  };
};
