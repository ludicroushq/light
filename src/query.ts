import { IncomingMessage } from 'http';
import { URL } from 'url';

export default (req: IncomingMessage): any => {
  if (!req.url) {
    return {};
  }
  const { searchParams } = new URL(req.url, 'http://localhost');

  const params = {};
  searchParams.forEach((value: string, key: string): void => {
    (params as any)[key] = value;
  });
  return params;
};
