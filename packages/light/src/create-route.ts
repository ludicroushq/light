/* eslint-disable @typescript-eslint/naming-convention */
import { IncomingMessage, ServerResponse } from 'http';
import AWSServerlessMicro from 'aws-serverless-micro';
import { createError, run } from 'micro';
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
import { applyMiddleware } from './utils/apply-middleware';
import { requestHandlerWrapper } from './utils/request-handler';

const { LIGHT_ENV } = process.env;
const isNetlify = LIGHT_ENV === 'netlify';
const isAWS = LIGHT_ENV === 'aws';
const isRunKit = LIGHT_ENV === 'runkit';
const isNow = LIGHT_ENV === 'now';
const isServerless = isNetlify || isAWS || isRunKit || isNow;

export const createRoute = (): CreateRoute => {
  const _route: Route = JSON.parse('{}');
  const middleware: Middleware[] = [];
  _route.middleware = middleware;

  /**
   * Generate wrapper functions for all http methods
   */
  const genFunction = (key: HTTPMethod): HandlerMethod => (
    fn: HandlerFunction,
    opts?: HandlerMethodOptions,
  ): void => {
    if (!fn) throw new Error('please provide a function to method');
    _route[key] = {
      handler: fn,
      middleware: opts?.middleware || [],
    };
  };

  const wrappers: Record<HTTPMethod, HandlerMethod> = JSON.parse('{}');
  [...Methods].forEach((method): void => {
    wrappers[method as HTTPMethod] = genFunction(method as HTTPMethod);
  });

  let route = _route;
  if (isServerless) {
    const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
      const method = req.method || 'GET';
      const routeMethod = route[method as HTTPMethod];
      if (!routeMethod) {
        throw createError(404, 'Not Found');
      }
      const { handler, middleware: routeMethodMiddleware } = routeMethod;
      const mw = [...(route.middleware || []), ...(routeMethodMiddleware || [])];
      const appliedHandler = applyMiddleware(mw, handler);
      const requestHandler = requestHandlerWrapper(appliedHandler);

      return requestHandler(req, res, {}, null);
    };
    if (isNow) {
      (route as any) = (req: IncomingMessage, res: ServerResponse) => run(req, res, routeHandler);
    }
    if (isNetlify || isAWS) {
      route = {
        handler: AWSServerlessMicro(routeHandler),
      } as any;
    }
    if (isRunKit) {
      route = {
        endpoint: (req: IncomingMessage, res: ServerResponse) => run(req, res, routeHandler),
      } as any;
    }
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
