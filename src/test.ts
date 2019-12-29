import listen from 'test-listen';
import { server } from './index';

// TODO: redo with hooks
// TODO: support multiple routes with a given route object
export default async (route: any, opts?: any): Promise<any> => {
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
        method: 'GET',
        path: '/',
      },
    ],
  });

  const url = await listen(app.server);

  return {
    url,
    app,
    server: app.server,
    close(): void {
      this.server.close();
    },
  };
};
