import fs from 'fs';
import path from 'path';
import micromatch from 'micromatch';

const ls: (dir: string, filelist: string[]) => any = (dir, filelist = []): string[] => fs.readdirSync(dir)
  .map(file => (fs.statSync(path.join(dir, file)).isDirectory()
    ? ls(path.join(dir, file), filelist)
    : filelist.concat(path.join(dir, file))[0]));

const flatten = (arr: any[]): any[] => {
  return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}

export default (path: string, glob: string) => {
  const files = flatten(ls(path, []));
  return micromatch(files, glob);
};
