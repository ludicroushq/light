import { CommandBuilder } from 'yargs'; // eslint-disable-line
import { relative } from 'path';
import emojic from 'emojic';
import chalk from 'chalk';
import decache from 'decache';

import logger from '../../utils/logger';
import { createServer } from '../../index';

export const command = 'dev [dir]';
export const aliases: string[] = ['d'];
export const desc = 'start a development server';

export const builder: CommandBuilder = {
  port: {
    alias: 'p',
    description: 'specify which port the server should run on',
  },
  typescript: {
    alias: 't',
    boolean: true,
    description: 'enable typescript in the project',
  },
  dir: {
    default: './',
    description: 'base directory for the light server',
    hidden: true,
  },
};

interface Args {
  dir: string;
  port?: string;
  typescript?: boolean;
}

const handle = async (argv: Args): Promise<void> => {
  if (argv.typescript) {
    require('ts-node').register(); // eslint-disable-line
  }

  logger.start(`${emojic.fire} igniting the server ${emojic.fire}`);

  const cwd = process.cwd();
  const app = createServer({ dev: true });

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
    const watcher = chokidar.watch(cwd, {
      ignored: '**/node_modules/**/*',
    });

    watcher.on('ready', (): void => {
      logger.hmr('watching for changes');
    });

    watcher.on('change', async (p: string): Promise<void> => {
      logger.hmr(`swapping out ${chalk.yellow(relative(cwd, p))}`);
      // remove edited file from cache
      decache(p);
      // reload the server
      app.reload();
    });
  });
};

export const handler = (argv: Args): void => {
  handle(argv).catch((err: Error): void => {
    logger.fatal(err);
    process.exit(1);
  });
};
