/* eslint-disable no-undef */
import { IncomingMessage, ServerResponse } from 'http';
import { createError } from 'micro';
import { HTTPMethod } from 'find-my-way';

// HTTP methods
export { HTTPMethod };
export const Methods: HTTPMethod[] = [
  'ACL',
  'BIND',
  'CHECKOUT',
  'CONNECT',
  'COPY',
  'DELETE',
  'GET',
  'HEAD',
  'LINK',
  'LOCK',
  'M-SEARCH',
  'MERGE',
  'MKACTIVITY',
  'MKCALENDAR',
  'MKCOL',
  'MOVE',
  'NOTIFY',
  'OPTIONS',
  'PATCH',
  'POST',
  'PROPFIND',
  'PROPPATCH',
  'PURGE',
  'PUT',
  'REBIND',
  'REPORT',
  'SEARCH',
  'SOURCE',
  'SUBSCRIBE',
  'TRACE',
  'UNBIND',
  'UNLINK',
  'UNLOCK',
  'UNSUBSCRIBE',
];

// req/res
export interface Request extends IncomingMessage {
  params: Record<string, string | undefined>;
  query: Record<string, string | string[]>;
}
export interface Response extends ServerResponse {}

// Context
type BodyParsingInfo = { limit?: string | number; encoding?: string };
export interface Context {
  req: Request;
  res: Response;
  buffer: (info?: BodyParsingInfo) => Promise<Buffer | string>;
  text: (info?: BodyParsingInfo) => Promise<string>;
  json: (info?: BodyParsingInfo) => Promise<object>;
  send: (code: number, data?: any) => Promise<void>;
  sendError: (info: {
    statusCode?: number;
    status?: number;
    message?: string;
    stack?: string;
  }) => Promise<void>;
  createError: typeof createError;
}

// Create Route
export interface HandlerMethodOptions {
  middleware?: Middleware[];
}
// Type for GET, POST, etc functions
export type HandlerMethod = (fn: HandlerFunction, opts?: HandlerMethodOptions) => void;
// Type of the function passed by the user
export type HandlerFunction = (params: Context) => any | Promise<any>;

// Value returned by `route`, AKA the exported value from the file
interface RouteMethod {
  handler: HandlerFunction;
  middleware: Middleware[];
}
type BaseRoute = {
  [key in HTTPMethod]?: RouteMethod;
};
export interface Route extends BaseRoute {
  middleware: Middleware[];
}

export interface CreateRoute extends Record<HTTPMethod, HandlerMethod> {
  useMiddleware: (middleware: Middleware | Middleware[]) => void;
  route: Route;
}

// createRoute inner types
export type Handlers = Partial<Record<HTTPMethod, HandlerFunction>>;
export type Middleware = (fn: HandlerFunction) => HandlerFunction;

// route object
export interface RouteObject {
  path: string;
  route: Route;
  file: string;
}

// serverless types
export type RegularRoute = (req: Request, res: Response) => {};
export interface RunkitRoute {
  endpoint: RegularRoute;
}
export interface AWSRoute {
  handler: RegularRoute;
}
export type AnyRoute = RegularRoute | RunkitRoute | AWSRoute;
