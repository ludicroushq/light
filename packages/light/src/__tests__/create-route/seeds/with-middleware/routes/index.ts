import { createRoute } from '../../../../../index';

const { route, GET, useMiddleware } = createRoute();

useMiddleware((fn) => async (ctx) => {
  (ctx.req as any).test = true;
  return fn(ctx);
});

GET(({ req }) => ({ test: (req as any).test }));

export default route;
