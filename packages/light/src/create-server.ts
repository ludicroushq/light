import micro, { createError } from 'micro';
import Router from 'find-my-way';
import { join } from 'path';
import { IncomingMessage, ServerResponse } from 'http';
import { importLightConfig } from './utils/import-config';
import genRoutes from './utils/gen-routes';
import findRoutes from './utils/find-routes';
import { LightServer, CreateServerOptions } from './types/server';
import injectRoutes from './utils/inject-routes';
import { applyMiddleware } from './utils/apply-middleware';
import { requestHandlerWrapper } from './utils/request-handler';

export const createServer = ({
  youch = false,
  requestLogger = true,
}: CreateServerOptions): LightServer => {
  /**
   * IMPORTANT: We need to import the logging middleware at start-time
   * since the ts-node loader wont be injected during the initial import
   */
  // eslint-disable-next-line global-require
  const { requestLoggerMiddleware } = require('./middleware/logger');
  // eslint-disable-next-line global-require
  const { youchMiddleware } = require('./middleware/youch');

  const middleware = [
    ...(requestLogger ? [requestLoggerMiddleware] : []),
    ...(youch ? [youchMiddleware] : []),
  ];
  // create find-my-way router with default 404 handler
  const defaultRoute = requestHandlerWrapper(
    applyMiddleware(middleware, () => {
      throw createError(404, 'Not Found');
    }) as () => never,
  ) as () => never;

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
    injectRoutes(router, generatedRoutes, { middleware });
    return generatedRoutes;
  };
  const generatedRoutes = fillRouter();

  // create the http server
  const server = micro(async (req: IncomingMessage, res: ServerResponse) =>
    router.lookup(req, res));

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
