const { createRoute } = require('light');

const { route, addMiddleware, addPlugin } = createRoute('index');
addMiddleware(light.middleware);
addPlugin(light.plugin);

module.exports = route(async () => {
  return {
    hello: 'world',
  };
});
