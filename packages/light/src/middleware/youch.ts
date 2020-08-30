import Youch from 'youch';
import forTerminal from 'youch-terminal';

import { Context } from '../types/route';
import { logger } from '../logger';

export const youchMiddleware = (fun: any) => async (ctx: Context): Promise<void> => {
  try {
    return await fun(ctx);
  } catch (err) {
    const youch = new Youch(err, ctx.req);
    const json = await youch.toJSON();
    logger.info(forTerminal(json)); // eslint-disable-line
    return youch.toHTML();
  }
};
