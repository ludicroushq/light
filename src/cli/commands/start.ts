import { CommandBuilder } from 'yargs'; // eslint-disable-line
import { join } from 'path';
import emojic from 'emojic';
import logger from '../../utils/logger';

import { server } from '../../index';

export const command = 'start [dir]';
export const aliases: string[] = ['s'];
export const desc = 'start a production server';

export const builder: CommandBuilder = {
  log: {
    alias: 'l',
    description: 'enable or disable logs',
    boolean: true,
    default: true,
  },
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
  const routesPath = join(cwd, './routes');

  const app = server({
    routes: routesPath,
    log: argv.log,
  });

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
