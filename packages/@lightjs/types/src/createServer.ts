import Router from 'find-my-way';
import { Server } from 'http';
import { Middleware } from './createRoute';
import { ImportedRoute } from './createRouter';

export type CreateServerOptions = {
  middleware?: Middleware[];
};

export type CreateServer = {
  server: Server;
  router: Router.Instance<Router.HTTPVersion.V1>;
  importedRoutes: ImportedRoute[];
  reload: () => ImportedRoute[];
};
