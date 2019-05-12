import { IncomingMessage } from 'http';
import { URL } from 'url';

export default (req: IncomingMessage): any => {
  if (!req.url) {
    return {};
  }

  const { searchParams } = new URL(req.url, 'http://localhost');

  const params = {};
  Array.from(searchParams.keys()).forEach((key): void => {
    let value: string | string[] = searchParams.getAll(key);
    if (value.length === 1) {
      [value] = value;
    }
    (params as any)[key] = value;
  });
  return params;
};
