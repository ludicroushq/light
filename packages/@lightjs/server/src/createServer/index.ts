import micro from 'micro';
import { IncomingMessage, ServerResponse } from 'http';
import { CreateServerOptions, CreateServer } from '@lightjs/types';
import { createRouter } from '@lightjs/router';
import { importLightConfig } from '@lightjs/config';

export function createServer({ middleware }: CreateServerOptions = {}): CreateServer {
  importLightConfig();

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
