import createServer from './create-server';
import { CreateServerOptions, LightServer } from './types/server';

export default (opts?: CreateServerOptions): LightServer => createServer({
  requestLogger: false,
  ...(opts || {}),
});
