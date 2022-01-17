import { createError, buffer, text, json, send, sendError } from 'micro';
import { HandlerFunction } from '@lightjs/types';
import { IncomingMessage, ServerResponse } from 'http';

export function convertHandlerFunctionToRequestHandler(handler: HandlerFunction) {
  return (req: IncomingMessage, res: ServerResponse) =>
    handler({
      req,
      res,
      createError,
      buffer: (info) => buffer(req, info),
      text: (info) => text(req, info),
      json: (info) => json(req, info),
      send: (code, data) => send(res, code, data),
      sendError: (info) => sendError(req, res, info),
    });
}
