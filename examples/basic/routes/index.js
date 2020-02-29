const { createRoute } = require('light');

const { route, addMiddleware, addPlugin } = createRoute('index');

addMiddleware(() => console.log('hi'));
addPlugin((fn) => async (req, res) => {
  console.log('before');
  const result = await fn(req, res);
  console.log('after');
  return result;
});

module.exports = route(async () => {
  return {
    hello: 'world',
  };
});
