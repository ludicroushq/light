import { CreateConfig, CreateLoggerConfig, CreateMiddlewareConfig } from '@lightjs/types';
import { join } from 'path';
import { importTSorJSFile } from '../utils/importFile';

export function importLightConfig(): CreateConfig | null {
  const cwd = process.cwd();
  const path = join(cwd, 'light.config');
  return importTSorJSFile(path);
}

/**
 * Imports a file from either the root or src directory.
 */
export function importProjectFile(relativePathWithoutExtension: string) {
  const cwd = process.cwd();
  const rootDir = join(cwd);
  const srcDir = join(cwd, 'src');

  return (
    importTSorJSFile(join(rootDir, relativePathWithoutExtension)) ||
    importTSorJSFile(join(srcDir, relativePathWithoutExtension)) ||
    null
  );
}

export function importLoggerConfig(): CreateLoggerConfig | null {
  return importProjectFile('config/_logger');
}

export function importMiddlewareConfig(): CreateMiddlewareConfig | null {
  return importProjectFile('config/_middleware');
}
