/* eslint-disable no-undef, import/prefer-default-export */

import { Server } from 'http';

export { Server };

export interface LightServer {
  server: Server;
  router: any;
  reload: () => void;
}

export interface CreateServerOptions {
  dev?: boolean;
  errorHandler?: boolean;
  requestLogger?: boolean;
}
