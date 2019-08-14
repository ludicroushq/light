import listen from 'test-listen';
import { server } from './index';

type Options = {
}

export default async (routes: string | any[] | any, opts?: Options): Promise<any> => {
  let handlers = [];
  if (typeof routes === 'string') {
    handlers.push(routes);
  } else {
    handlers = routes;
  }
  const app = server({
    routes: handlers,
    log: false,
  });

  const url = await listen(app.server);

  return {
    url,
    app,
    server: app.server,
    close: function () {
      this.server.close();
    }
  };
};
