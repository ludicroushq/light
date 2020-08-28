/* eslint-disable @typescript-eslint/naming-convention */
import {
  CreateRoute,
  HTTPMethod,
  Methods,
  HandlerFunction,
  HandlerMethod,
  Route,
  HandlerMethodOptions,
} from './types/route';

export default (): CreateRoute => {
  const route: Route = JSON.parse('{}');

  /**
   * Generate wrapper functions for all http methods
   */
  const genFunction = (key: HTTPMethod | 'ALL'): HandlerMethod => (
    fn: HandlerFunction,
    opts?: HandlerMethodOptions,
  ): void => {
    if (!fn) throw new Error('please provide a function to method');
    route[key] = {
      handler: fn,
      middleware: opts?.middleware || [],
    };
  };

  const wrappers: Record<HTTPMethod | 'ALL', HandlerMethod> = JSON.parse('{}');
  [...Methods, 'ALL'].forEach((method): void => {
    wrappers[method as HTTPMethod | 'ALL'] = genFunction(method as HTTPMethod | 'ALL');
  });

  return {
    route,
    ...wrappers,
  };
};
