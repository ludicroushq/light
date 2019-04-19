const start = Date.now();
import light from '../../index';
import { CommandBuilder } from 'yargs'; // eslint-disable-line
import { join, relative } from 'path';
import { black, bgGreen, bgBlueBright, redBright, yellow } from 'colorette';
import emojic from 'emojic';

import importRoute from '../../utils/import-route';

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
	console.log(redBright(`${emojic.fire} igniting the server ${emojic.fire}`))

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
		console.log(bgGreen(black(` ${Date.now() - start}ms `)), 'listening on 3000');

		console.log(bgBlueBright(black(' DEV ')), 'starting the hot reloader');
		const chokidar = require('chokidar');
		const watcher = chokidar.watch(routesPath);
		watcher.on('ready', () => console.log(bgBlueBright(black(' DEV ')), 'watching for changes'));
		watcher.on('change', (p: string) => {
			console.log(bgBlueBright(black(' DEV ')), `swapping out ${yellow(relative(cwd, p))}`);
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
