import micro from 'micro';
import { IncomingMessage, ServerResponse } from 'http';
import { CreateServerOptions, CreateServer } from '@lightjs/types';
import { createRouter } from '@lightjs/router';
import { importLightConfig } from '@lightjs/config';

export function createServer({ middleware }: CreateServerOptions = {}): CreateServer {
  // Import the light config so that if the user has any one-off scripts defined, they will execute
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
