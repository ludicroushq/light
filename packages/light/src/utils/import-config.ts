import { existsSync } from 'fs';
import { join } from 'path';
import { Config } from '../types/config';

export default (path: string): Config => {
  if (!path) {
    return {};
  }
  const file = join(path, 'light.config.js');
  if (existsSync(file)) {
    const conf = require(file); // eslint-disable-line
    return conf || {};
  }
  return {};
};
