import listen from 'test-listen';
import { server } from './index';

interface Options {
  log?: boolean;
}

export default async (routes: string | any[] | any, opts?: Options): Promise<any> => {
  const options = Object.assign({}, opts, {
    log: false,
  });

  let handlers = [];
  if (typeof routes === 'string') {
    handlers.push(routes);
  } else {
    handlers = routes;
  }
  const app = server({
    routes: handlers,
    log: options.log,
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
