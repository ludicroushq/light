const { useRoute, params } = require('light');

const { setHandler, addMiddleware, addPlugin } = useRoute('index');

addMiddleware(() => console.log('hi'));
addPlugin((fn) => async (req, res) => {
  console.log('before');
  const result = await fn(req, res);
  console.log('after');
  return result;
});

const a = setHandler(async (req, res) => {
  const { route } = await params('/api/v1/:route', req.url);
  return {
    route: route,
  };
});

module.exports = a;
