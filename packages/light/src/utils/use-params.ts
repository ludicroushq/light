import { Path } from 'path-parser';

export default (path: string, url: string): any => {
  const parser = new Path(path);
  return parser.test(url);
};
