const { createRoute, params } = require('light');

const { route, addMiddleware, addPlugin } = createRoute('index');

addMiddleware(() => console.log('hi'));
addPlugin((fn) => async (req, res) => {
  console.log('before');
  const result = await fn(req, res);
  console.log('after');
  return result;
});

const a = route(async (req, res) => {
  const { route } = await params('/api/v1/:route', req.url);
  return {
    route: route,
  };
});

module.exports = a;
