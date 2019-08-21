import path from 'path';
import { existsSync } from 'fs';

let cwd = process.cwd();
const requirePaths = [];
while (cwd !== '/') {
  requirePaths.push(cwd);
  cwd = path.join(cwd, '../');
}
const configPaths = requirePaths.map(p => path.join(p, 'config/logger.js'));

const config: any = configPaths.reduce((acc, val) => {
  if (acc) {
    return acc;
  }
  if (existsSync(val)) {
    try {
      console.log('requiring');
      return require(val);
    } catch (err) {
      console.log(`unable to import light.config.js: ${err}`);
    }
  }
  return false;
}, false);

export default (message: any): void => {
  if (config) {
    config(console.log)(message);
  } else {
    console.log(message);
  }
};
