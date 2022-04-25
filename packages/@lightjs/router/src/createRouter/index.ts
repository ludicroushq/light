import Router from 'find-my-way';
import { CreateRouterOptions } from '@lightjs/types';
import { createError } from 'micro';
import { convertHandlerFunctionToRequestHandler, applyMiddleware } from '@lightjs/utils';
import { join } from 'path';
import { existsSync } from 'fs';
import { findRouteFiles } from '../utils/findRouteFiles';
import { importRouteFiles } from '../utils/importRouteFiles';
import { injectRouteIntoRouter } from '../utils/injectRouteIntoRouter';

function findRoutesFolder() {
  const cwd = process.cwd();
  const rootDir = join(cwd, 'routes');
  const srcDir = join(cwd, 'src', 'routes');

  if (existsSync(rootDir)) return rootDir;
  if (existsSync(srcDir)) return srcDir;
  return rootDir;
}

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

  const routesDirPath = findRoutesFolder();

  const fillRouter = () => {
    const routeFiles = findRouteFiles(routesDirPath);
    const importedRoutes = importRouteFiles(routeFiles, routesDirPath);
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
