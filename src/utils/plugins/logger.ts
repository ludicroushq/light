import { IncomingMessage, ServerResponse } from 'http';
import bytes from 'bytes';

// import pinoHandler from '../../pino';
// import isProd from '../is-prod';

type IM = IncomingMessage;
type SR = ServerResponse;

/* istanbul ignore next */
const signale = require('../logger'); // eslint-disable-line

module.exports = (fn: any): any => async (req: IM, res: SR): Promise<any> => {
  const id = Math.random().toString(36).substring(2, 6);
  const log = signale.scope(id);
  const msg = `${req.url}`;
  const { method } = req as any;
  if (log[method]) {
    log[method](msg);
  } else {
    log.request(msg);
  }

  const done = (): void => {
    res.removeListener('finish', onfinish); // eslint-disable-line
    res.removeListener('close', onclose); // eslint-disable-line
    const status = res.statusCode;
    const len = (res as any)._contentLength; // eslint-disable-line
    let length;
    if ([204, 205, 304].includes(status)) {
      length = '';
    } else if (len == null) {
      length = '-';
    } else {
      length = bytes(len).toLowerCase();
    }
    log.response(`${status} ${length}`);
  };

  const onfinish = done.bind(null, 'finish');
  const onclose = done.bind(null, 'close');

  res.once('finish', onfinish);
  res.once('close', onclose);

  return fn(req, res);
}
