import { Context } from './context';
import { HTTPMethod } from './http';

export type UseMiddleware = (mw: Middleware | Middleware[], methods?: HTTPMethod[]) => void;
export type InternalRoute = Partial<Record<HTTPMethod, HandlerFunction>>;
export type ComponentOpts = { useMiddleware: UseMiddleware };
export type Component = (opts: ComponentOpts) => InternalRoute;
// TODO: Restrict `HandlerFunction` type
export type HandlerFunction = (params: Context) => any | Promise<any>;
export type Middleware = (fn: HandlerFunction) => HandlerFunction;

// interface RouteMethod {
//   handler: HandlerFunction;
//   middleware: Middleware[];
// }
// type BaseRoute = {
//   [key in HTTPMethod]?: RouteMethod;
// };
// export interface Route extends BaseRoute {
//   middleware: Middleware[];
// }
