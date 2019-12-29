import Path from 'path-parser';

// TODO: ensure tests cover this
export default async (path: string, url: string): Promise<any> => {
  const parser = new Path(path);
  return parser.test(url);
};
