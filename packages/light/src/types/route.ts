/* eslint-disable no-undef, import/prefer-default-export */

interface Route {
  path: string;
  handler: any;
  location?: string;
}

interface RouteObject {
  path?: string | string[];
  handler: any;
  method?: string[] | string;
  file?: string;
}

interface TestOptions {
  dev?: boolean;
  requestLogger?: boolean;
  errorHandler?: boolean;
  path?: string;
}

export {
  Route,
  TestOptions,
  RouteObject,
};
