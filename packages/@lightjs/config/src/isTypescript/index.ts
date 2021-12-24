import { existsSync } from 'fs';
import { join } from 'path';

export function isTypescript() {
  const tsConfig = join(process.cwd(), 'tsconfig.json');
  return existsSync(tsConfig);
}
