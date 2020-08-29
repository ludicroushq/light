import { HandlerFunction, Middleware } from '../types/route';

export const applyMiddleware = (
  middleware: Middleware[],
  handler: HandlerFunction,
): HandlerFunction => middleware.reverse().reduce((acc: any, val: any): any => val(acc), handler);
