import { CommandBuilder } from 'yargs'; // eslint-disable-line
import { join, relative } from 'path';
import emojic from 'emojic';
import chalk from 'chalk';
import decache from 'decache';

import logger from '../../utils/logger';
import Route from '../../types/route';
import { server } from '../../index';
import findRoutes from '../../utils/find-routes';
import addRoute from '../../utils/add-route';
import importRoutes from '../../utils/import-routes';

export const command = 'dev [dir]';
export const aliases: string[] = ['d'];
export const desc = 'start a development server';

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

    logger.hmr('starting the hot reloader');
    const chokidar = require('chokidar'); // eslint-disable-line
    const watcher = chokidar.watch(cwd);
    watcher.on('ready', (): void => {
      // TODO: if the following `decache` solution doesn't work, this does
      // let absolute = '';
      // Module.prototype.require = new Proxy(Module.prototype.require,{
      //   apply(target, thisArg, argumentsList){
      //     let name = argumentsList[0];
      //     if (path.isAbsolute(name)) {
      //       absolute = path.dirname(name);
      //       name = '';
      //     }
      //     if (!name.endsWith('.js')) {
      //       name += '.js';
      //     }
      //     delete require.cache[path.join(absolute, name)];
      //     return Reflect.apply(target, thisArg, argumentsList)
      //   }
      // });
      logger.hmr('watching for changes');
    });
    watcher.on('change', (p: string): void => {
      logger.hmr(`swapping out ${chalk.yellow(relative(cwd, p))}`);
      app.router.reset();
      const files: string[] = findRoutes(routesPath);
      files.forEach((f): void => {
        decache(f);
      });
      const routeObjs = importRoutes(files, routesPath);
      routeObjs.forEach((route: Route): void => {
        addRoute(app.router, route);
      });
    });
  });
};

export const handler = (argv: Args): void => {
  handle(argv).catch((err: Error): void => {
    logger.fatal(err);
    process.exit(1);
  });
};
