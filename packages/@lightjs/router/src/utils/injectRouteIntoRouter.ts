import Router from 'find-my-way';
import { ImportedRoute, Middleware } from '@lightjs/types';
import { applyMiddleware, convertHandlerFunctionToRequestHandler } from '@lightjs/utils';

type InjectRoutesOptions = {
  middleware?: Middleware[];
};

export function injectRouteIntoRouter(
  router: Router.Instance<Router.HTTPVersion.V1>,
  routes: ImportedRoute[],
  opts: InjectRoutesOptions,
) {
  routes.forEach((routeObj): void => {
    const { route, path } = routeObj;

    const middleware = [...(opts.middleware || [])];
    const appliedHandler = applyMiddleware(middleware, route);
    const requestHandler = convertHandlerFunctionToRequestHandler(appliedHandler);

    router.all(path, requestHandler);
  });
}
