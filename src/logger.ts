import path from 'path';
import log from './utils/logger';
import { existsSync } from 'fs';
import { COPYFILE_FICLONE_FORCE } from 'constants';

let cwd = process.cwd();
const requirePaths = []
while (cwd !== '/') {
  requirePaths.push(cwd);
  cwd = path.join(cwd, '../');
}
const configPaths = requirePaths.map((p) => path.join(p, 'light.config.js'));

const config: any = configPaths.reduce((acc, val) => {
  let conf = {};
  if (existsSync(val)) {
    try {
      console.log('requiring')
      conf = require(val);
    } catch (err) {
      log.error(`unable to import light.config.js: ${err}`);
    }
  }
  return {
    ...acc,
    ...conf,
  };
}, {});

export default (message: any): void => {
  if (config.logger) {
    console.log(`${config.logger} - ${message}`)
  } else {
    console.log(message);
  }
};
