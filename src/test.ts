import listen from 'test-listen';
import { server } from './index';

// TODO: support multiple routes with a given route object
export default async (route: any): Promise<any> => {
  // generate a server with only the route provided
  const app = server({
    routes: [
      {
        handler: route,
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
