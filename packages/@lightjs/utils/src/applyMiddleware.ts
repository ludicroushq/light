import { HandlerFunction, Middleware } from '@lightjs/types';

export function applyMiddleware(middleware: Middleware[], handler: HandlerFunction) {
  return [...middleware]
    .reverse()
    .reduce((acc: HandlerFunction, val: Middleware) => val(acc), handler);
}
