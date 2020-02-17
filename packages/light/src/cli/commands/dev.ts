import { CommandBuilder } from 'yargs'; // eslint-disable-line
import { join, relative } from 'path';
import emojic from 'emojic';
import chalk from 'chalk';
import decache from 'decache';

import logger from '../../utils/logger';
import { server } from '../../index';
import findRoutes from '../../utils/find-routes';
import genRoutes from '../../utils/gen-routes';
import injectRoutes from '../../utils/inject-routes';

export const command = 'dev [dir]';
export const aliases: string[] = ['d'];
export const desc = 'start a development server';

export const builder: CommandBuilder = {
  port: {
    alias: 'p',
    description: 'specify which port the server should run on',
  },
  dir: {
    default: './',
    description: 'base directory for the light server',
    hidden: true,
  },
};

interface Args {
  log: boolean;
  dir: string;
  port?: string;
}

const handle = async (argv: Args): Promise<void> => {
  logger.start(`${emojic.fire} igniting the server ${emojic.fire}`);

  const cwd = join(process.cwd(), argv.dir);

  // const opts = {
  //   dev: true,
  // };

  const routePaths = await findRoutes(cwd);
  const routes = await genRoutes(routePaths, cwd);
  const app = server({ routes });

  interface ProcessEnv {
    [key: string]: string | number | undefined;
  }

  const {
    HOST = '0.0.0.0',
  }: ProcessEnv = process.env;

  let {
    PORT = 3000,
  }: ProcessEnv = process.env;
  if (argv.port) {
    PORT = argv.port;
  }

  app.server.listen(PORT, (HOST as any), (): void => {
    logger.listening(`on port ${PORT}`);

    logger.hmr('starting the hot reloader');
    const chokidar = require('chokidar'); // eslint-disable-line
    const watcher = chokidar.watch(cwd);

    watcher.on('ready', (): void => {
      logger.hmr('watching for changes');
    });

    watcher.on('change', async (p: string): Promise<void> => {
      logger.hmr(`swapping out ${chalk.yellow(relative(cwd, p))}`);
      // reset the router
      app.router.reset();
      // remove edited file from cache
      decache(p);
      // remove every route from the cache
      const newRoutePaths = await findRoutes(cwd);
      newRoutePaths.forEach((routePath): void => {
        const f = join(cwd, 'routes', routePath);
        decache(f);
      });
      // add the new routes to the router again
      const newRoutes = await genRoutes(newRoutePaths, cwd);
      injectRoutes(app.router, newRoutes);
    });
  });
};

export const handler = (argv: Args): void => {
  handle(argv).catch((err: Error): void => {
    logger.fatal(err);
    process.exit(1);
  });
};
