#!/usr/bin/env node

import yargs from 'yargs';

async function run() {
  let { argv } = yargs.commandDir('commands').demandCommand().recommendCommands().strict().help();

  if (argv instanceof Promise) {
    argv = await argv;
  }

  if (!argv._[0]) {
    yargs.showHelp();
  }
}

run();
