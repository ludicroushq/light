import { existsSync } from 'fs';
import { join } from 'path';

export const importFile = (fileName: string) => {
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
