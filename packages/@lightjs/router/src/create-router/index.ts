import Router from 'find-my-way';
import { join } from 'path';
import { CreateRouterOptions } from '@lightjs/types';
import { createError } from 'micro';
import { config } from '@lightjs/config';
import { requestHandlerWrapper, applyMiddleware } from '@lightjs/utils';
import genRoutes from '../utils/gen-routes';
import findRoutes from '../utils/find-routes';
import injectRoutes from '../utils/inject-routes';

export const createRouter = ({ middleware = [] }: CreateRouterOptions) => {
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
  const rootPath = join(cwd, config.root ? config.root : './');
  const routeFiles = findRoutes(rootPath);

  const fillRouter = () => {
    const generatedRoutes = genRoutes(routeFiles, rootPath);
    injectRoutes(router, generatedRoutes, { middleware });
    return generatedRoutes;
  };
  const generatedRoutes = fillRouter();

  return {
    router,
    generatedRoutes,
    reload: () => {
      // reset the router
      router.reset();
      // reimport routes
      return fillRouter();
    },
  };
};
