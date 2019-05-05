import { IncomingMessage } from 'http';
import { parse as parseURL } from 'url';
import { parse as parseQueryString } from 'querystring';

export default (req: IncomingMessage): any => {
  if (!req.url) {
    return {};
  }
  const { query } = parseURL(req.url);
  return parseQueryString(query || '');
};
