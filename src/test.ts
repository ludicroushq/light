import listen from 'test-listen';
import { server } from './index';

// TODO: support multiple routes with a given route object
export default async (route: any, opts?: any): Promise<any> => {
  // generate a server with only the route provided
  const options = {
    disableRequestLogger: true,
    ...(opts || {}),
  }

  const app = server({
    routes: [
      {
        handler: (req: any, res: any) => route(req, res, options),
        method: 'GET',
        path: '/',
      }
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
