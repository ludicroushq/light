import Router from 'find-my-way';
import { RouteObject, Middleware, Route } from '@lightjs/types';
import { applyMiddleware, requestHandlerWrapper } from '@lightjs/utils';

type InjectRoutesOptions = {
  middleware?: Middleware[];
};

export default (
  router: Router.Instance<Router.HTTPVersion.V1>,
  routes: RouteObject[],
  opts: InjectRoutesOptions,
): void => {
  routes.forEach((routeObj): void => {
    const { route, path } = routeObj;
    if (!route) {
      throw new Error('nothing was exported');
    }

    Object.keys(route).forEach((untypedKey) => {
      const key = untypedKey as keyof Route;
      if (key === 'middleware') return;
      const value = route[key];
      if (!value) {
        throw new Error('no handler specified');
      }

      const { handler } = value;

      const middleware = [
        ...(opts.middleware || []),
        ...(route.middleware || []),
        ...(value.middleware || []),
      ];
      const appliedHandler = applyMiddleware(middleware, handler);
      const requestHandler = requestHandlerWrapper(appliedHandler);

      router.on(key, path, requestHandler);
    });
  });
};
