/* eslint-disable no-undef */
import { IM, SR } from './http';

// the route definition that will be ingested
interface RouteObject {
  path?: string | string[];
  handler: any;
  method?: string[] | string;
  file?: string;
}

// options passed to the route
interface Options {
  dev?: boolean;
  requestLogger?: boolean;
  errorHandler?: boolean;
}

interface TestOptions {
  dev?: boolean;
  requestLogger?: boolean;
  errorHandler?: boolean;
  method?: string | string[];
  path?: string | string[];
}

interface Route {
  handler: (fn: (req: IM, res: SR) => {} | any) => (req: IM, res: SR) => {};
  middleware: (fn: any) => void;
  plugin: (fn: any) => void;
}

export {
  RouteObject,
  Options,
  TestOptions,
  Route,
};
