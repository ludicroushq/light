import { existsSync } from 'fs';

function importFile(fileName: string) {
  if (existsSync(fileName)) {
    let conf = require(fileName); // eslint-disable-line
    if (!conf) return null;
    if (conf.default) conf = conf.default;
    return conf;
  }
  return null;
}

export function importTSorJSFile(fileName: string) {
  return importFile(`${fileName}.ts`) || importFile(`${fileName}.js`);
}
