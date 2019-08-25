/* eslint-disable max-len */
import fs from 'fs';
import path from 'path';
import micromatch from 'micromatch';

/* istanbul ignore next */
const ls: (dir: string, filelist: string[]) => any = (dir, filelist = []): any[] => fs.readdirSync(dir)
  .map((file: string): any[] => (fs.statSync(path.join(dir, file)).isDirectory()
    ? ls(path.join(dir, file), filelist)
    : filelist.concat(path.join(dir, file))[0]));

/* istanbul ignore next */
const flatten = (arr: any[]): any[] => arr.reduce((acc: any, val: any): any[] => (Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val)), []);

export default (url: string, glob: string): string[] => {
  const files = flatten(ls(url, []));
  return micromatch(files, glob);
};
