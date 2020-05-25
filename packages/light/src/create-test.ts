import createServer from './create-server';
import { CreateServerOptions } from './types/server';

export default (opts?: CreateServerOptions): any => {
  const app = createServer({
    requestLogger: false,
    ...(opts || {}),
  });

  return app.server;
};
