#!/usr/bin/env node

import yargs from 'yargs';

const { argv } = yargs
  .commandDir('commands')
  .demandCommand()
  .recommendCommands()
  .strict()
  .help();

if (!argv._[0]) {
  yargs.showHelp();
}
