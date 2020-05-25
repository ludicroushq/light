/* eslint-disable no-undef */
import { IncomingMessage, ServerResponse } from 'http';
import {
  buffer,
  text,
  json,
  run,
  send,
  sendError,
  createError,
} from 'micro';

// req/res
export type Request = IncomingMessage;
export type Response = ServerResponse;

// HTTP methods
export type HTTPMethod = 'connect' | 'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put' | 'trace';
export const Methods: HTTPMethod[] = ['connect', 'delete', 'get', 'head', 'options', 'patch', 'post', 'put', 'trace'];

// params sent to handlers
export interface HandlerParams {
  req: Request;
  res: Response;
  buffer: typeof buffer;
  text: typeof text;
  json: typeof json;
  send: typeof send;
  sendError: typeof sendError;
  createError: typeof createError;
}

// types of get() and the function passed in
export type HandlerFunction = (params: HandlerParams) => {};
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
  run: typeof run;
};

// createRoute inner types
export type Handlers = Partial<Record<HTTPMethod | 'all', HandlerFunction>>;
export type Middleware = any;
export type Plugin = any;
export type MiddlewareObject = Partial<Record<HTTPMethod | 'global', Middleware[]>>;
export type PluginObject = Partial<Record<HTTPMethod | 'global', Plugin[]>>;

// route object
export interface RouteObject {
  path: string;
  handler: ServerRoute;
  location: string;
}
