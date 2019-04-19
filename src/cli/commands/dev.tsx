const start = Date.now();
import light from '../../index';
import { CommandBuilder } from 'yargs'; // eslint-disable-line
import { join, relative } from 'path';
import emojic from 'emojic';
import { yellow, blueBright } from 'colorette';

import importRoute from '../../utils/import-route';
import log from '../log';

export const command: string = 'dev';
export const aliases: string[] = ['d'];
export const desc: string = 'start a development srvr';

export const builder: CommandBuilder = {
  'log': {
    alias: 'l',
    description: 'enable or disable logs',
    boolean: true,
    default: true,
  },
};

interface Args {
	log: boolean;
}

const handle = async (argv: Args) => {
	log('start', `${emojic.fire} igniting the server ${emojic.fire}`, {
		titleColor: 'brightred',
		messageColor: 'brightred',
	});

	const cwd = process.cwd();
	const routesPath = join(cwd, './routes');

	const app = light({
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

	app.server.listen(PORT, (HOST as any), () => {
		log(`${Date.now() - start}ms`, 'listening on 3000', {
			titleColor: 'green',
		});

		log('hmr', 'starting the hot reloader', {
			titleColor: 'brightblue',
		});
		const chokidar = require('chokidar');
		const watcher = chokidar.watch(routesPath);
		watcher.on('ready', () => log('hmr', 'watching for changes', {
			titleColor: 'brightblue',
		}))
		watcher.on('change', (p: string) => {
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

export const handler = (argv: Args) => {
  handle(argv).catch((err: Error) => {
    console.log(err);
  });
};
