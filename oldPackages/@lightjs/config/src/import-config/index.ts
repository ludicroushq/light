import { Config } from '@lightjs/types';
import { existsSync } from 'fs';
import { join } from 'path';

const importFile = (fileName: string) => {
  const path = process.cwd();
  const file = join(path, fileName);
  if (existsSync(file)) {
    let conf = require(file); // eslint-disable-line
    if (!conf) return null;
    if (conf.default) conf = conf.default;
    return conf;
  }
  return null;
};

export const importLightConfig = (): Config =>
  importFile('light.config.ts') || importFile('light.config.js') || {};

export const isTypescript = (): boolean => {
  const tsConfig = join(process.cwd(), 'tsconfig.json');
  return existsSync(tsConfig);
};
