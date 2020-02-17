/* eslint-disable no-undef, import/prefer-default-export */

import { Server } from './http';

interface LightServer {
  server: Server;
  router: any;
}

export {
  LightServer,
};
