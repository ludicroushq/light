/* eslint-disable no-console */
import { CommandBuilder } from 'yargs'; // eslint-disable-line
import emojic from 'emojic';
import chalk from 'chalk';

import { isTypescript } from '../../utils/import-config';
import { logger, createServer } from '../../index';

export const command = 'start';
export const desc = 'start a production server';

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

  logger.info(`[ ${chalk.redBright('start')} ] ${emojic.fire} igniting the server ${emojic.fire}`);

  const app = createServer();

  const { HOST = '0.0.0.0' } = process.env;

  let { PORT = 3000 } = process.env;
  if (argv.port) {
    PORT = argv.port;
  }

  app.server.listen(PORT, HOST as any, (): void => {
    logger.info(`[ ${chalk.magentaBright('listening')} ] on port ${PORT}`);
  });
};

export const handler = (argv: Args): void => {
  handle(argv).catch((err: Error): void => {
    console.error(err);
    process.exit(1);
  });
};
