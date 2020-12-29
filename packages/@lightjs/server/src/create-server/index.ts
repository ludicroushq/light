import micro from 'micro';
import { IncomingMessage, ServerResponse } from 'http';
import { LightServer, CreateServerOptions } from '@lightjs/types';
import { createRouter } from '@lightjs/router';

export const createServer = ({
  middleware: globalMiddleware = [],
}: CreateServerOptions = {}): LightServer => {
  // TODO: apply this
  // /**
  //  * IMPORTANT: We need to import the logging middleware at start-time
  //  * since the ts-node loader wont be injected during the initial import
  //  */
  // // eslint-disable-next-line global-require
  // const { requestLoggerMiddleware } = require('./middleware/logger');
  // // eslint-disable-next-line global-require
  // const { youchMiddleware } = require('./middleware/youch');

  const middleware = [...globalMiddleware];

  const { router, reload, generatedRoutes } = createRouter({ middleware });

  // create the http server
  const server = micro(async (req: IncomingMessage, res: ServerResponse) =>
    router.lookup(req, res),
  );

  return {
    router,
    generatedRoutes,
    reload,
    server,
  };
};
