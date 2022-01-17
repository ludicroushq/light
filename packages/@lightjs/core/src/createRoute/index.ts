/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Methods,
  HTTPMethod,
  Component,
  Middleware,
  RouteHandler,
  InternalRoute,
  Context,
} from '@lightjs/types';
import { applyMiddleware, convertHandlerFunctionToRequestHandler } from '@lightjs/utils';
import { IncomingMessage, ServerResponse } from 'http';
import AWSServerlessMicro from 'aws-serverless-micro';
import { createError, run } from 'micro';
import {
  isAWS,
  isNetlify,
  isNextJS,
  isNow,
  isRunKit,
  isServerless,
  isVercel,
} from './isServerless';

function parseHTTPMethod(method?: string): HTTPMethod {
  if (!method) return 'GET';

  if (!Methods.includes(method as HTTPMethod)) {
    throw new Error(`Invalid HTTP method: ${method}`);
  }

  return method as HTTPMethod;
}

export function createRoute(component: Component) {
  const _middleware: Partial<Record<HTTPMethod, Middleware[]>> & { _global: Middleware[] } = {
    _global: [],
  };

  function useMiddleware(mw: Middleware | Middleware[], methods?: HTTPMethod[]) {
    const middleware = Array.isArray(mw) ? mw : [mw];

    if (!methods) {
      _middleware._global.push(...middleware);
      return;
    }

    methods.forEach((method) => {
      if (!_middleware[method]) {
        _middleware[method] = [];
      }
      // TODO: Is there any way to remove the optional chaining below?
      _middleware[method]?.push(...middleware);
    });
  }

  const _route: InternalRoute = component({ useMiddleware });

  /**
   * Take the handler function (with context param) and convert it to a request handler
   */
  function defaultRouteHandler(ctx: Context) {
    const { req } = ctx;
    const method = parseHTTPMethod(req.method);
    const routeMethod = _route[method];
    if (!routeMethod) {
      throw createError(405, 'Method Not Allowed');
    }
    const mw = [..._middleware._global, ...(_middleware[method] || [])];
    const appliedHandler = applyMiddleware(mw, routeMethod);
    return appliedHandler(ctx);
  }

  /**
   * Export the correct request handler based on the environment
   *
   * Serverfull = request handler (with options)
   * Vercel/Next/Now = request handler
   * Netlify/AWS = AWS handler
   * Runkit = custom request handler
   */
  let routeHandler: RouteHandler = defaultRouteHandler;

  if (isServerless) {
    const requestHandler = convertHandlerFunctionToRequestHandler(defaultRouteHandler);

    const safeGuardedRoute = (req: IncomingMessage, res: ServerResponse) =>
      run(req, res, requestHandler);
    if (isNow || isVercel || isNextJS) {
      routeHandler = safeGuardedRoute;
    }
    if (isNetlify || isAWS) {
      routeHandler = {
        handler: AWSServerlessMicro(safeGuardedRoute),
      };
    }
    if (isRunKit) {
      routeHandler = {
        endpoint: safeGuardedRoute,
      };
    }
  }

  return routeHandler;
}
