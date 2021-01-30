/* eslint-disable no-console */
import { CommandBuilder } from 'yargs'; // eslint-disable-line
import { relative } from 'path';
import emojic from 'emojic';
import chalk from 'chalk';
import decache from 'decache';
import { isTypescript, importLightConfig } from '@lightjs/config';
import { RouteObject } from '@lightjs/types';

export const command = 'dev';
export const desc = 'start a development server';

export const builder: CommandBuilder = {
  port: {
    alias: 'p',
    description: 'specify which port the server should run on',
  },
};

interface Args {
  port?: string;
}

const handle = async (argv: Args): Promise<void> => {
  const ts = isTypescript();
  if (ts) {
    require('ts-node').register(); // eslint-disable-line
  }

  /**
   * IMPORTANT: We need to import the light library AFTER we require ts-node
   */
  // eslint-disable-next-line global-require
  const { createServer } = require('@lightjs/server');
  // eslint-disable-next-line global-require
  const { logger } = require('@lightjs/logger');
  // eslint-disable-next-line global-require
  const { youchMiddleware } = require('../middleware/youch');

  const config = importLightConfig();
  const globalMiddleware = config.middleware || [];

  logger.info(`[ ${chalk.redBright('start')} ] ${emojic.fire} igniting the server ${emojic.fire}`);

  const cwd = process.cwd();
  const app = createServer({
    middleware: [youchMiddleware, ...globalMiddleware],
  });

  const { HOST = '0.0.0.0' } = process.env;

  let { PORT = 3000 } = process.env;
  if (argv.port) {
    PORT = argv.port;
  }

  app.server.listen(PORT, HOST as any, (): void => {
    logger.info(`[ ${chalk.magentaBright('listening')} ] on port ${PORT}`);

    logger.info(`[ ${chalk.blueBright('hmr')} ] starting the hot reloader`);
    const chokidar = require('chokidar'); // eslint-disable-line
    const watcher = chokidar.watch(cwd, {
      ignored: ['**/node_modules/**/*', '**/node_modules/**/.*', '**/.git/**/*'],
    });

    let { generatedRoutes } = app;

    watcher.on('ready', (): void => {
      logger.info(`[ ${chalk.blueBright('hmr')} ] watching for changes`);
    });

    watcher.on(
      'change',
      async (p: string): Promise<void> => {
        logger.info(
          `[ ${chalk.blueBright('hmr')} ] swapping out ${chalk.yellow(relative(cwd, p))}`,
        );
        // remove edited file from cache
        decache(p);

        // decache all routes
        generatedRoutes.forEach((x: RouteObject) => {
          decache(x.file);
        });

        process.removeAllListeners();

        // reload the server
        generatedRoutes = app.reload();
      },
    );
  });
};

export const handler = (argv: Args): void => {
  handle(argv).catch((err: Error): void => {
    console.error(err);
    process.exit(1);
  });
};
