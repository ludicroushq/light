import { IncomingMessage, ServerResponse } from 'http';
import { createRoute } from 'light';

const { route, GET, useMiddleware } = createRoute();

useMiddleware((fn) => async (ctx) => {
  console.log('before');
  const result = await fn(ctx);
  console.log('after');
  return result;
});

GET(async ({ req }) => {
  console.log(`receiving request at path: ${req.url}`);
  return {
    hello: 'world',
  };
});

module.exports = route;
