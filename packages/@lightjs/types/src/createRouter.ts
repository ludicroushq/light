import { Middleware } from './createRoute';
import { ServerfullRoute } from './routeHandler';

export type CreateRouterOptions = {
  middleware?: Middleware[];
};

export type ImportedRoute = {
  path: string;
  route: ServerfullRoute;
  file: string;
};
