import { existsSync } from 'fs';
import { join } from 'path';
import { LightConfig, LoggerConfig } from '../types/config';

const importFile = (fileName: string) => {
  const path = process.cwd();
  const file = join(path, fileName);
  if (existsSync(file)) {
    let conf = require(file); // eslint-disable-line
    if (conf.default) conf = conf.default;
    return conf;
  }
  return null;
};

export const importLoggerConfig = (): LoggerConfig =>
  importFile('config/logger.ts') || importFile('config/logger.js') || {};

export const importLightConfig = (): LightConfig =>
  importFile('light.config.ts') || importFile('light.config.js') || {};

export const isTypescript = (): boolean => {
  const tsConfig = join(process.cwd(), 'tsconfig.json');
  return existsSync(tsConfig);
};
