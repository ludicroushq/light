/* eslint-disable no-undef */
import { IncomingMessage, ServerResponse } from 'http';
import { run, createError } from 'micro';

// req/res
export type Request = IncomingMessage;
export type Response = ServerResponse;

// HTTP methods
export type HTTPMethod =
  | 'connect'
  | 'delete'
  | 'get'
  | 'head'
  | 'options'
  | 'patch'
  | 'post'
  | 'put'
  | 'trace';
export const Methods: HTTPMethod[] = [
  'connect',
  'delete',
  'get',
  'head',
  'options',
  'patch',
  'post',
  'put',
  'trace',
];

type BodyParsingInfo = { limit?: string | number; encoding?: string };

// params sent to handlers
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
  useParams: (path: string) => object;
  useQuery: () => object;
}

// types of get() and the function passed in
export type HandlerFunction = (params: Context) => any | Promise<any>;
export type HandlerMethod = (fn: HandlerFunction) => void;

// serverless types
export type ServerRoute = (req: Request, res: Response) => {};
export interface RunkitRoute {
  endpoint: ServerRoute;
}
export interface AWSRoute {
  handler: ServerRoute;
}
export type AnyRoute = ServerRoute | RunkitRoute | AWSRoute;

// createRoute return values
export type CreateRoute = Record<HTTPMethod, HandlerMethod> & {
  all: HandlerMethod;
  route: AnyRoute;
  useMiddleware: (middleware: Middleware, methods?: HTTPMethod[]) => void;
  usePlugin: (plugin: Plugin, methods?: HTTPMethod[]) => void;
  useConnect: (connect: any, methods?: HTTPMethod[]) => void;
  run: typeof run;
};

// createRoute inner types
export type Handlers = Partial<Record<HTTPMethod | 'all', HandlerFunction>>;
export type Middleware = (params: Context) => any | Promise<any>;
export type Plugin = (fn: HandlerFunction) => HandlerFunction;
export type MiddlewareObject = Partial<Record<HTTPMethod | 'global', Middleware[]>>;
export type PluginObject = Partial<Record<HTTPMethod | 'global', Plugin[]>>;

// route object
export interface RouteObject {
  path: string;
  handler: ServerRoute;
  location: string;
}
