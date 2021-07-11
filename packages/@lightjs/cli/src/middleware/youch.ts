import { logger } from '@lightjs/logger';
import { Context } from '@lightjs/types';
import Youch from 'youch';
import forTerminal from 'youch-terminal';

export const youchMiddleware =
  (fun: any) =>
  async (ctx: Context): Promise<any> => {
    try {
      // eslint-disable-next-line @typescript-eslint/return-await
      return await fun(ctx);
    } catch (err) {
      const youch = new Youch(err, ctx.req);
      const json = await youch.toJSON();
      logger.info(forTerminal(json)); // eslint-disable-line
      return youch.toHTML();
    }
  };
