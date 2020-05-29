import { createRoute } from '../../../../../index';

const {
  route, get, usePlugin, useMiddleware,
} = createRoute();

useMiddleware(({ req }) => {
  (req as any).middleware = true;
});

usePlugin((fn) => async (ctx) => {
  const result = await fn(ctx);
  result.plugin = true;
  return result;
});

get(({ req }) => ({ hello: 'world', middleware: (req as any).middleware }));

export default route;
