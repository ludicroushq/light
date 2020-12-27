import Router, { Handler } from 'find-my-way';
import { createError, buffer, text, json, send, sendError } from 'micro';
import { Request, HandlerFunction } from '../types/route';

export const requestHandlerWrapper = (handler: HandlerFunction): Handler<Router.HTTPVersion.V1> => (
  req,
  res,
  params = {},
) => {
  (req as Request).params = params;
  (req as Request).query = {};
  return handler({
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
