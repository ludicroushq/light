import Router, { HTTPMethod, Handler } from 'find-my-way';

import { createError, buffer, text, json, send, sendError } from 'micro';
import { RouteObject, Request } from '../types/route';

export default (router: Router.Instance<Router.HTTPVersion.V1>, routes: RouteObject[]): void => {
  routes.forEach((route): void => {
    const { handler } = route;
    if (!handler) {
      throw new Error('nothing was exported');
    }
    Object.keys(handler).forEach((untypedKey) => {
      const key = untypedKey as HTTPMethod | 'ALL';
      const value = handler[key];
      if (!value) {
        throw new Error('no handler specified');
      }

      const requestHandler: Handler<Router.HTTPVersion.V1> = (req, res, params) => {
        (req as Request).params = params;
        (req as Request).query = {};
        return value.handler({
          req: req as Request,
          res,
          createError,
          buffer: (info) => buffer(req, info),
          text: (info) => text(req, info),
          json: (info) => json(req, info),
          send: (code, data) => send(res, code, data),
          sendError: (info) => sendError(req, res, info),
        });
      };

      if (key === 'ALL') {
        router.all(route.path, requestHandler);
      } else {
        router.on(key, route.path, requestHandler);
      }
    });
  });
};
