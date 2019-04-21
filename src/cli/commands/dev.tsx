import { CommandBuilder } from 'yargs'; // eslint-disable-line
import { join, relative } from 'path';
import emojic from 'emojic';
import { yellow } from 'colorette';
import { server } from '../../index';

import importRoute from '../../utils/import-route';
import log from '../log';

const start = Date.now();

export const command = 'dev [dir]';
export const aliases: string[] = ['d'];
export const desc = 'start a development srvr';

export const builder: CommandBuilder = {
  log: {
    alias: 'l',
    description: 'enable or disable logs',
    boolean: true,
    default: true,
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
}

const handle = async (argv: Args): Promise<void> => {
  log('start', `${emojic.fire} igniting the server ${emojic.fire}`, {
    titleColor: 'brightred',
    messageColor: 'brightred',
  });

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
    PORT = 3000,
    HOST = '0.0.0.0',
  }: ProcessEnv = process.env;

  app.server.listen(PORT, (HOST as any), (): void => {
    log(`${Date.now() - start}ms`, 'listening on 3000', {
      titleColor: 'green',
    });

    log('hmr', 'starting the hot reloader', {
      titleColor: 'brightblue',
    });
    const chokidar = require('chokidar'); // eslint-disable-line
    const watcher = chokidar.watch(routesPath);
    watcher.on('ready', (): void => log('hmr', 'watching for changes', {
      titleColor: 'brightblue',
    }));
    watcher.on('change', (p: string): void => {
      log('hmr', `swapping out ${yellow(relative(cwd, p))}`, {
        titleColor: 'brightblue',
      });
      delete require.cache[p];
      importRoute(app.router, {
        path: p,
        name: relative(routesPath, p),
      }, {
        log: argv.log,
      });
    });
  });
};

export const handler = (argv: Args): void => {
  handle(argv).catch((err: Error): void => {
    log('error', err.toString(), {
      titleColor: 'red',
    });
  });
};
