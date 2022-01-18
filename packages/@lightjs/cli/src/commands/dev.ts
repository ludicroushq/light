/* eslint-disable no-console */
import { CommandBuilder } from 'yargs'; // eslint-disable-line
import { relative } from 'path';
import emojic from 'emojic';
import chalk from 'chalk';
import decache from 'decache';
import { isTypescript, importLightConfig } from '@lightjs/config';
import { createServer } from '@lightjs/server';
import { ImportedRoute } from '@lightjs/types';

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

  const config = importLightConfig();
  const logger = config.logger?.createFrameworkLogger() ?? console;
  const globalMiddleware = config.middleware || [];

  logger.info(`[ ${chalk.redBright('start')} ] ${emojic.fire} igniting the server ${emojic.fire}`);

  /**
   * NOTE: We import youchMiddleware like this because it contains the use of the logger.
   * Using the logger requires the import of the light config which may be in typescript.
   * Since we initialize ts-node above, we need to make sure the youch import is after.
   */
  // eslint-disable-next-line global-require
  const { youchMiddleware } = require('../middleware/youch');

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

    let { importedRoutes } = app;

    watcher.on('ready', (): void => {
      logger.info(`[ ${chalk.blueBright('hmr')} ] watching for changes`);
    });

    watcher.on('change', async (p: string): Promise<void> => {
      logger.info(`[ ${chalk.blueBright('hmr')} ] swapping out ${chalk.yellow(relative(cwd, p))}`);
      // remove edited file from cache
      decache(p);

      // decache all routes
      importedRoutes.forEach((x: ImportedRoute) => {
        decache(x.file);
      });

      process.removeAllListeners();

      // reload the server
      importedRoutes = app.reload();
    });
  });
};

export const handler = (argv: Args): void => {
  handle(argv).catch((err: Error): void => {
    console.error(err);
    process.exit(1);
  });
};
