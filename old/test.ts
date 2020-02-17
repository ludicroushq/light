import listen from 'test-listen';
import { METHODS } from 'http';

import { TestOptions } from '../src/types/route';

import { server } from './index';

export default (route: any, opts?: TestOptions): any => {
  // generate a server with only the route provided
  const options = {
    requestLogger: false,
    dev: false,
    ...(opts || {}),
  };

  const app = server({
    routes: [
      {
        handler: async (req: any, res: any): Promise<any> => route(req, res, options),
        method: options.method || METHODS,
        path: options.path || '/',
      },
    ],
  });
  const srvr = app.server;

  return {
    async listen(): Promise<string> {
      return listen(srvr);
    },

    close(): any {
      srvr.close();
    },
  };
};
