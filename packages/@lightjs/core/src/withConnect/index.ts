import { Context } from '@lightjs/types';
import type { NextHandleFunction } from 'connect';

export const withConnect = (connect: NextHandleFunction) => (fn: any) => async (ctx: Context) => {
  await new Promise((resolve, reject) => {
    connect(ctx.req, ctx.res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
  return fn(ctx);
};
