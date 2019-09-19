import { CommandBuilder } from 'yargs'; // eslint-disable-line
import { join } from 'path';
import repl from 'repl';
import { existsSync } from 'fs';
import { relative, parse } from 'path';
import set from 'lodash.set';

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

const importFiles = (path: string) => {
  if (!existsSync(path)) {
    return {};
  }

  const uppercase = (word: string) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  const files = glob(path, '**/*.{js,ts}');
  const obj = {};
  files.forEach((file: string) => {
    const { dir, name } = parse(relative(path, file));
    const key = [...dir.split('/').map(x => uppercase(x)), name.split('-').map(x => uppercase(x)).join('')].filter(x => x)
    let val;
    try {
      val = require(file)
    } catch (err) {
      // do nothing
    }
    set(obj, key, val);
  });
  return obj;
}

const initializeContext = (context: any, cwd: string): string[] => {
  const modelsPath = join(cwd, './models');
  const jobsPath = join(cwd, './jobs');
  const Models: any = importFiles(modelsPath)
  const importedJobs: any = importFiles(jobsPath)
  const Jobs: any = Object.keys(importedJobs).reduce((acc, val) => {
    let key = val;
    if (!key.endsWith('Job')) {
      key = key.trim() + 'Job'
    }
    (acc as any)[key] = importedJobs[val];
    return acc;
  }, {})

  const addedContext = [...Object.keys(Models), ...Object.keys(Jobs)]

  context.Jobs = importedJobs;
  context.Models = Models;

  Object.keys(Models).forEach((key: string) => {
    context[key] = Models[key]
  })
  Object.keys(Jobs).forEach((key: string) => {
    context[key] = Jobs[key]
  })

  return addedContext;
}

const handle = async (argv: Args): Promise<void> => {
  const cwd = join(process.cwd(), argv.dir);

  const stubber = require('async-repl/stubber');
  const local = repl.start({ prompt: 'light> ' });
  require('repl.history')(local, process.env.HOME + '/.light_history');
  stubber(local);

  initializeContext(local.context, cwd);

  local.on('exit', () => {
    process.exit();
  });

  local.on('reset', (context) => {
    initializeContext(context, cwd);
  });
};

export const handler = (argv: Args): void => {
  handle(argv).catch((err: Error): void => {
    logger.fatal(err);
    process.exit(1);
  });
};
