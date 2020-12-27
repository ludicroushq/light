import { Context } from '../types';

export const withConnect = (connect: any) => (fn: any) => async (ctx: Context) => {
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
