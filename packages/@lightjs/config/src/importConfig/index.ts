import { Config } from '@lightjs/types';
import { importFile } from '../utils/importFile';

export function importLightConfig(): Config {
  return importFile('light.config.ts') || importFile('light.config.js') || {};
}
