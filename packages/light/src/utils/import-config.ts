import { existsSync } from 'fs';
import { join } from 'path';
import { LightConfig } from '../types/config';

export default (): LightConfig => {
  const path = process.cwd();
  const file = join(path, 'light.config.js');
  const fileTS = join(path, 'light.config.ts');
  if (existsSync(file)) {
    let conf = require(file); // eslint-disable-line
    if (conf.default) conf = conf.default;
    return conf || {};
  }
  if (existsSync(fileTS)) {
    let conf = require(fileTS); // eslint-disable-line
    if (conf.default) conf = conf.default;
    return conf || {};
  }
  return {};
};

export const isTypescript = (): boolean => {
  const path = process.cwd();
  const fileTS = join(path, 'light.config.ts');
  const tsConfig = join(path, 'tsconfig.json');
  return existsSync(fileTS) || existsSync(tsConfig);
};
