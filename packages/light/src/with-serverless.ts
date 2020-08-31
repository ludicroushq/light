import AWSServerlessMicro from 'aws-serverless-micro';
import { IncomingMessage, ServerResponse } from 'http';
import { run, createError } from 'micro';
import { Route, HTTPMethod } from './types/route';
import { applyMiddleware } from './utils/apply-middleware';
import { requestHandlerWrapper } from './utils/request-handler';

const { LIGHT_ENV } = process.env;
const isNetlify = LIGHT_ENV === 'netlify';
const isAWS = LIGHT_ENV === 'aws';
const isRunKit = LIGHT_ENV === 'runkit';
const isNow = LIGHT_ENV === 'now';
const isServerless = isNetlify || isAWS || isRunKit || isNow;

export const withServerless = (route: Route) => {
  if (!route) {
    throw new Error('nothing was exported');
  }
  const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method || 'GET';
    const routeMethod = route[method as HTTPMethod];
    if (!routeMethod) {
      throw createError(404, 'Not Found');
    }
    const { handler, middleware } = routeMethod;
    const mw = [...(route.middleware || []), ...(middleware || [])];
    const appliedHandler = applyMiddleware(mw, handler);
    const requestHandler = requestHandlerWrapper(appliedHandler);

    return requestHandler(req, res, {}, null);
  };

  let fn: any = routeHandler;
  if (isServerless) {
    if (isNow) {
      fn = (req: IncomingMessage, res: ServerResponse) => run(req, res, routeHandler);
    }
    if (isNetlify || isAWS) {
      fn = {
        handler: AWSServerlessMicro(routeHandler),
      };
    }
    if (isRunKit) {
      fn = {
        endpoint: (req: IncomingMessage, res: ServerResponse) => run(req, res, routeHandler),
      };
    }
  }

  return fn;
};
