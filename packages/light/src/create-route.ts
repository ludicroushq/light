/* eslint-disable @typescript-eslint/naming-convention */
import {
  CreateRoute,
  HTTPMethod,
  Methods,
  HandlerFunction,
  HandlerMethod,
  Route,
  HandlerMethodOptions,
  Middleware,
} from './types/route';
import { isServerless } from './utils/serverless';
import { withServerless } from './with-serverless';

export const createRoute = (): CreateRoute => {
  let route: Route = JSON.parse('{}');
  const middleware: Middleware[] = [];
  route.middleware = middleware;

  /**
   * Generate wrapper functions for all http methods
   */
  const genFunction = (key: HTTPMethod): HandlerMethod => (
    fn: HandlerFunction,
    opts?: HandlerMethodOptions,
  ): void => {
    if (!fn) throw new Error('please provide a function to method');
    route[key] = {
      handler: fn,
      middleware: opts?.middleware || [],
    };
  };

  const wrappers: Record<HTTPMethod, HandlerMethod> = JSON.parse('{}');
  [...Methods].forEach((method): void => {
    wrappers[method as HTTPMethod] = genFunction(method as HTTPMethod);
  });

  if (isServerless()) {
    route = withServerless(route);
  }

  return {
    route,
    useMiddleware: (mw: Middleware | Middleware[]) => {
      if (!Array.isArray(mw)) {
        middleware.push(mw);
        return;
      }
      middleware.push(...mw);
    },
    ...wrappers,
  };
};
