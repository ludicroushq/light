import pino from 'pino';
import pinoHTTP from 'pino-http';

import pinoPretty from '../helpers/pino-pretty';
// import { Options } from '../types/route';
import { IM, SR, AP } from '../types/http';

// TODO: remove extra logger out of here
export default ({ dev, requestLogger }: any): any => {
  const pinoOptions = dev ? {
    prettyPrint: true,
    prettifier: pinoPretty,
    level: 'trace',
  } : {};
  const logger = pino((pinoOptions as any));
  const pinoHandler = pinoHTTP({
    logger,
  });
  return (fn: any): any => async (req: IM, res: SR): AP => {
    if (requestLogger) {
      pinoHandler(req, res);
    }
    return fn(req, res);
  };
};
