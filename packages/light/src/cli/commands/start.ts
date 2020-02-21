import { CommandBuilder } from 'yargs'; // eslint-disable-line
import { join } from 'path';
import emojic from 'emojic';

import logger from '../../utils/logger';
import { createServer } from '../../index';

import findRoutes from '../../utils/find-routes';
import genRoutes from '../../utils/gen-routes';

export const command = 'start [dir]';
export const aliases: string[] = ['s'];
export const desc = 'start a production server';

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
  dir: string;
  port?: string;
}

const handle = async (argv: Args): Promise<void> => {
  logger.start(`${emojic.fire} igniting the server ${emojic.fire}`);

  const cwd = join(process.cwd(), argv.dir);

  const routePaths = await findRoutes(cwd);
  const routes = await genRoutes(routePaths, cwd);
  const app = createServer({ routes });

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
  });
};

export const handler = (argv: Args): void => {
  handle(argv).catch((err: Error): void => {
    logger.fatal(err);
    process.exit(1);
  });
};
