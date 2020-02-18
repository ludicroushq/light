import listen from 'test-listen';

import { TestOptions } from './types/route';

import { createServer } from './index';

export default (route: any, opts?: TestOptions): any => {
  // generate a server with only the route provided
  const options = {
    requestLogger: false,
    dev: false,
    ...(opts || {}),
  };

  const app = createServer({
    routes: [
      {
        path: options.path || '/',
        handler: async (req: any, res: any): Promise<any> => route(req, res, options),
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
