/* eslint-disable no-undef, import/prefer-default-export */

import { Server } from 'http';
import { RouteObject } from 'route';

export { Server };

export interface LightServer {
  server: Server;
  router: any;
  generatedRoutes: RouteObject[];
  reload: () => RouteObject[];
}

export interface CreateServerOptions {
  requestLogger?: boolean;
  youch?: boolean;
}
