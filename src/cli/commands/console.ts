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

const initializeContext = (context: any, cwd: string): string[] => {
  const modelsPath = join(cwd, './models');
  const jobsPath = join(cwd, './jobs');
  const Models: any = importFiles(modelsPath);
  const importedJobs: any = importFiles(jobsPath);
  const Jobs: any = Object.keys(importedJobs).reduce((acc, val): any => {
    let key = val;
    if (!key.endsWith('Job')) {
      key = `${key.trim()}Job`;
    }
    (acc as any)[key] = importedJobs[val];
    return acc;
  }, {});

  const addedContext = [...Object.keys(Models), ...Object.keys(Jobs)];

  context.Jobs = importedJobs;
  context.Models = Models;

  Object.keys(Models).forEach((key: string): void => {
    context[key] = Models[key];
  });
  Object.keys(Jobs).forEach((key: string): void => {
    context[key] = Jobs[key];
  });

  return addedContext;
};

const handle = async (argv: Args): Promise<void> => {
  const cwd = join(process.cwd(), argv.dir);

  const local = repl.start({ prompt: 'light> ' });
  replHistory(local, `${process.env.HOME}/.light_history`);
  stubber(local);

  initializeContext(local.context, cwd);

  local.on('exit', (): void => {
    process.exit();
  });

  local.on('reset', (context): void => {
    initializeContext(context, cwd);
  });
};

export const handler = (argv: Args): void => {
  handle(argv).catch((err: Error): void => {
    logger.fatal(err);
    process.exit(1);
  });
};
