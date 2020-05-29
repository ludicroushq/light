import { createRoute } from '../../../../../index';

const { route, get, usePlugin } = createRoute();

usePlugin((fn) => async (ctx) => {
  const result = await fn(ctx);
  result.plugin = true;
  return result;
});

get(() => ({ hello: 'world' }));

export default route;
