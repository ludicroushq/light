import { RouteHandler, ServerfullRoute } from '@lightjs/types';
import { convertHandlerFunctionToRequestHandler } from '@lightjs/utils';
import { IncomingMessage, ServerResponse } from 'http';
import { run } from 'micro';

export function createRouteTest(route: RouteHandler) {
  // assume that the route is in serverfull mode
  const handler = convertHandlerFunctionToRequestHandler(route as ServerfullRoute);
  // TODO: duplicated code below, needs refactor
  const safeGuardedRoute = (req: IncomingMessage, res: ServerResponse) => run(req, res, handler);
  return safeGuardedRoute;
}
