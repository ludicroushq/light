import { existsSync } from 'fs';
import { join } from 'path';
import { LightConfig, LoggerConfig } from '@lightjs/types';

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

export const importLightConfig = (): LightConfig =>
  importFile('light.config.ts') || importFile('light.config.js') || {};

export const importLoggerConfig = (): LoggerConfig => {
  const { root = '' } = importLightConfig();
  return (
    importFile(join(root, 'config/logger.ts')) || importFile(join(root, 'config/logger.js')) || {}
  );
};

export const isTypescript = (): boolean => {
  const tsConfig = join(process.cwd(), 'tsconfig.json');
  return existsSync(tsConfig);
};
