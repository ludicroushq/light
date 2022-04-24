import { CreateConfig, CreateLoggerConfig, CreateMiddlewareConfig } from '@lightjs/types';
import { join } from 'path';
import { importFile } from '../utils/importFile';

export function importLightConfig(): CreateConfig | null {
  return importFile('light.config.ts') || importFile('light.config.js') || null;
}

export function importConfigFile(nameWithoutExtension: string) {
  const config = importLightConfig();
  // If the logger is imported in the light.config.ts file, we end up with a circular dependency.
  // As a result, the `require` returns an empty object. We can just return null in that case and use the console logger.
  if (typeof config !== 'function') return null;
  const configDir = join(config?.().sourceDir || process.cwd(), 'config');
  const file =
    importFile(join(configDir, `${nameWithoutExtension}.ts`)) ||
    importFile(join(configDir, `${nameWithoutExtension}.js`));
  if (!file) return null;
  return file;
}

export function importLoggerConfig(): CreateLoggerConfig | null {
  return importConfigFile('_logger');
}

export function importMiddlewareConfig(): CreateMiddlewareConfig | null {
  return importConfigFile('_middleware');
}
