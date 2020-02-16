import Path from 'path-parser';

export default async (path: string, url: string): Promise<any> => {
  const parser = new Path(path);
  return parser.test(url);
};
