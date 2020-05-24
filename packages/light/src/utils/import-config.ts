import { existsSync } from 'fs';
import { join } from 'path';
import { LightConfig } from '../types/config';

export default (): LightConfig => {
  const path = process.cwd();
  const file = join(path, 'light.config.js');
  const fileTS = join(path, 'light.config.ts');
  if (existsSync(file)) {
    const conf = require(file); // eslint-disable-line
    return conf || {};
  }
  if (existsSync(fileTS)) {
    const conf = require(fileTS); // eslint-disable-line
    return conf || {};
  }
  return {};
};
