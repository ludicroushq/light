/* eslint-disable no-param-reassign */
import { CommandBuilder } from 'yargs'; // eslint-disable-line
import { join, relative, parse } from 'path';
import repl from 'repl';
import { existsSync } from 'fs';
import set from 'lodash.set';
import stubber from 'async-repl/stubber';
import replHistory from 'repl.history';

import logger from '../../utils/logger';
import glob from '../../utils/glob';

export const command = 'console [dir]';
export const aliases: string[] = ['c'];
export const desc = 'start a console';

export const builder: CommandBuilder = {
  dir: {
    default: './',
    description: 'base directory for the console',
    hidden: true,
  },
};

interface Args {
  dir: string;
}

const importFiles = (path: string): any => {
  if (!existsSync(path)) {
    return {};
  }

  const uppercase = (word: string): string => {
    const letter = word.charAt(0).toUpperCase();
    const rest = word.substr(1).toLowerCase();
    return letter + rest;
  };
  const files = glob(path, '**/*.{js,ts}');
  const obj = {};
  files.forEach((file: string): void => {
    const { dir, name } = parse(relative(path, file));
    const key = [
      ...dir.split('/').map((x): string => uppercase(x)),
      name.split('-').map((x): string => uppercase(x)).join(''),
    ].filter((x): string => x);
    let val;
    try {
      val = require(file); // eslint-disable-line
    } catch (err) {
      // do nothing
    }
    set(obj, key, val);
  });
  return obj;
};

const initializeContext = (context: any, config: any, cwd: string): string[] => {
  const path = join(cwd, config.path);
  const importedFolder: any = importFiles(path);
  const Folder: any = Object.keys(importedFolder).reduce((acc, val): any => {
    let key = val;
    if (!key.endsWith(config.suffix)) {
      key = `${key.trim()}${config.suffix}`;
    }
    (acc as any)[key] = importedFolder[val];
    return acc;
  }, {});

  context[config.name] = importedFolder;

  Object.keys(Folder).forEach((key: string): void => {
    context[key] = Folder[key];
  });

  return Object.keys(Folder);
};

const handle = async (argv: Args): Promise<void> => {
  const cwd = join(process.cwd(), argv.dir);

  const local = repl.start({ prompt: 'light> ' });
  replHistory(local, `${process.env.HOME}/.light_history`);
  stubber(local);

  const defaultConfig = [
    {
      name: 'Models',
      suffix: '',
      path: 'models',
    },
    {
      name: 'Jobs',
      suffix: 'Job',
      path: 'jobs',
    },
  ];

  let addedContext = [];
  defaultConfig.forEach((config: any): void => {
    addedContext.push(...initializeContext(local.context, config, cwd));
  });


  local.on('exit', (): void => {
    process.exit();
  });

  local.on('reset', (context): void => {
    addedContext = [];
    defaultConfig.forEach((config: any): void => {
      addedContext.push(...initializeContext(local.context, config, cwd));
      initializeContext(context, config, cwd);
    });
  });
};

export const handler = (argv: Args): void => {
  handle(argv).catch((err: Error): void => {
    logger.fatal(err);
    process.exit(1);
  });
};
