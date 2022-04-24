import micro from 'micro';
import { IncomingMessage, ServerResponse } from 'http';
import { CreateServerOptions, CreateServer } from '@lightjs/types';
import { createRouter } from '@lightjs/router';

export function createServer({ middleware }: CreateServerOptions = {}): CreateServer {
  const { router, reload, importedRoutes } = createRouter({ middleware });

  // create the http server
  const server = micro(async (req: IncomingMessage, res: ServerResponse) =>
    router.lookup(req, res),
  );

  return {
    router,
    importedRoutes,
    reload,
    server,
  };
}
