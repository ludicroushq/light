import { existsSync } from 'fs';
import { join } from 'path';

const findGlobal = (path: string): any => {
  if (!path || path === '/') {
    return {};
  }
  const file = join(path, 'light.config.js');
  if (existsSync(file)) {
    const conf = require(file); // eslint-disable-line
    return conf.global || {};
  }
  return findGlobal(join(path, '../'));
};

export default (): any => findGlobal(process.cwd());
