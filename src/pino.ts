import path from 'path';
import { existsSync } from 'fs';
import pino from 'pino';

import log from './utils/logger';

let cwd = process.cwd();
const requirePaths = [];
while (cwd !== '/') {
  requirePaths.push(cwd);
  cwd = path.join(cwd, '../');
}
const configPaths = requirePaths.map(p => path.join(p, 'light.config.js'));

const config: any = configPaths.reduce((acc, val) => {
  let conf = {};
  if (existsSync(val)) {
    try {
      console.log('requiring');
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

let logger: any;
// if (config.logger) {
//   logger = config.logger(pino);
// } else {
// }
logger = pino();

export default logger;
