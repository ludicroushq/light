/* eslint-disable no-underscore-dangle */
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
} from '@lightjs/types';
import { requestHandlerWrapper, applyMiddleware } from '@lightjs/utils';

const { LIGHT_ENV } = process.env;
const isNetlify = LIGHT_ENV?.toLowerCase() === 'netlify';
const isAWS = LIGHT_ENV?.toLowerCase() === 'aws';
const isRunKit = LIGHT_ENV?.toLowerCase() === 'runkit';
const isNow = LIGHT_ENV?.toLowerCase() === 'now';
const isVercel = LIGHT_ENV?.toLowerCase() === 'vercel';
const isNextJS = LIGHT_ENV?.toLowerCase() === 'nextjs';
const isServerless = isNetlify || isAWS || isRunKit || isNow || isVercel || isNextJS;

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
  // TODO: extract this to its own package
  if (isServerless) {
    const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
      const method = req.method || 'GET';
      const routeMethod = _route[method as HTTPMethod];
      if (!routeMethod) {
        throw createError(404, 'Not Found');
      }
      const { handler, middleware: routeMethodMiddleware } = routeMethod;
      const mw = [...(_route.middleware || []), ...(routeMethodMiddleware || [])];
      const appliedHandler = applyMiddleware(mw, handler);
      const requestHandler = requestHandlerWrapper(appliedHandler);

      return requestHandler(req, res, {}, null);
    };
    if (isNow || isVercel || isNextJS) {
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
