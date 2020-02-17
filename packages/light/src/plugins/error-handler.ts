import pino from 'pino';

import pinoPretty from '../helpers/pino-pretty';
import { Options } from '../types/route';
import { IM, SR } from '../types/http';

export default ({ errorHandler: errH, dev }: Options): any => {
  const pinoOptions = dev ? {
    prettyPrint: true,
    prettifier: pinoPretty,
    level: 'trace',
  } : {};
  const logger = pino((pinoOptions as any));
  return (fun: any): any => async (req: IM, res: SR): Promise<void> => {
    try {
      return await fun(req, res);
    } catch (err) {
      if (errH) {
        logger.error(err);
      }
      throw err;
    }
  };
};
