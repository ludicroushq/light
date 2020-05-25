import micro from 'micro';
import Router from 'find-my-way';
import { join } from 'path';
import youchPlugin from './plugins/youch';
import genRoutes from './utils/gen-routes';
import findRoutes from './utils/find-routes';
import { LightServer, CreateServerOptions } from './types/server';
import { Request, Response, Plugin } from './types/route';
import importConfig from './utils/import-config';
import injectRoutes from './utils/inject-routes';
import requestLoggerPlugin from './plugins/logger';

export default ({
  youch = true,
  requestLogger = true,
}: CreateServerOptions): LightServer => {
  // create find-my-way router with default 404 handler
  const router = Router({
    ignoreTrailingSlash: true,
    defaultRoute: requestLoggerPlugin((_: Request, res: Response): void => {
      res.statusCode = 404;
      res.end('Not Found');
    }),
  });

  const cwd = process.cwd();
  const config = importConfig();
  const rootPath = join(cwd, config.root ? config.root : './');

  const fillRouter = (): void => {
    const routeFiles = findRoutes(rootPath);
    const generatedRoutes = genRoutes(routeFiles, rootPath);
    const plugins: Plugin[] = [];

    if (youch) {
      plugins.push(youchPlugin);
    }

    if (requestLogger) {
      plugins.push(requestLoggerPlugin);
    }

    injectRoutes(router, generatedRoutes, plugins);
  };
  fillRouter();

  // create the http server
  const server = micro(
    async (req: Request, res: Response): Promise<any> => router.lookup(req, res),
  );

  return {
    router,
    reload: (): void => {
      // reset the router
      router.reset();
      // reimport routes
      fillRouter();
    },
    server,
  };
};
