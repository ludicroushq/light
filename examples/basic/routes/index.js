const { createRoute } = require('light');
const { route, get, useMiddleware, usePlugin } = createRoute();

useMiddleware(() => console.log('hi'));
usePlugin((fn) => async (req, res) => {
  console.log('before');
  const result = await fn(req, res);
  console.log('after');
  return result;
});

get(async () => {
  return {
    hello: 'world',
  };
});

module.exports = route;
