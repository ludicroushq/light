import Router from 'find-my-way';
import { join } from 'path';
import { CreateRouterOptions } from '@lightjs/types';
import { createError } from 'micro';
import { importLightConfig } from '@lightjs/config';
import { convertHandlerFunctionToRequestHandler, applyMiddleware } from '@lightjs/utils';

import { findRouteFiles } from '../utils/findRouteFiles';
import { importRouteFiles } from '../utils/importRouteFiles';
import { injectRouteIntoRouter } from '../utils/injectRouteIntoRouter';

export function createRouter({ middleware = [] }: CreateRouterOptions) {
  // create find-my-way router with default 404 handler
  const defaultRoute = convertHandlerFunctionToRequestHandler(
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

  const fillRouter = () => {
    const routeFiles = findRouteFiles(rootPath);
    const importedRoutes = importRouteFiles(routeFiles, rootPath);
    injectRouteIntoRouter(router, importedRoutes, { middleware });
    return importedRoutes;
  };
  const importedRoutes = fillRouter();

  return {
    router,
    importedRoutes,
    reload: () => {
      // reset the router
      router.reset();
      // reimport routes
      return fillRouter();
    },
  };
}
