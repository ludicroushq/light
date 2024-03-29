import { useFrameworkLogger } from '@lightjs/logger';
import { Context } from '@lightjs/types';
import Youch from 'youch';
import forTerminal from 'youch-terminal';

const logger = useFrameworkLogger();

export function youchMiddleware(fun: any) {
  return async function youchHandler(ctx: Context) {
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
}
