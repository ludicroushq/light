const start = Date.now();
import light from '../../index';
import { CommandBuilder } from 'yargs'; // eslint-disable-line
import { join } from 'path';
import { black, bgGreen, redBright } from 'colorette';
import emojic from 'emojic';

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

	const app = light({
		routes: join(cwd, './routes'),
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
	});
};

export const handler = (argv: Args) => {
  handle(argv).catch((err: Error) => {
    console.log(err);
  });
};
