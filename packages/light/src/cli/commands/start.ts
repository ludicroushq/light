import { CommandBuilder } from 'yargs'; // eslint-disable-line
import emojic from 'emojic';
import chalk from 'chalk';

import { isTypescript } from '../../utils/import-config';

export const command = 'start [dir]';
export const aliases: string[] = ['s'];
export const desc = 'start a production server';

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
  const ts = isTypescript();
  if (argv.typescript || ts) {
    require('ts-node').register(); // eslint-disable-line
  }

  // eslint-disable-next-line global-require
  const { createServer } = require('../../index');

  console.info(`[ ${chalk.redBright('start')} ] ${emojic.fire} igniting the server ${emojic.fire}`);

  const app = createServer({});

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
    console.info(`[ ${chalk.magentaBright('listening')} ] on port ${PORT}`);
  });
};

export const handler = (argv: Args): void => {
  handle(argv).catch((err: Error): void => {
    console.error(err);
    process.exit(1);
  });
};
