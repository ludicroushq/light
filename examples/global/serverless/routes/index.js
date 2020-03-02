const { createRoute, useGlobal } = require('light');

const { middleware, plugin } = useGlobal();
const { route, addMiddleware, addPlugin } = createRoute('index');
addMiddleware(middleware);
addPlugin(plugin);

module.exports = route(async () => {
  return {
    hello: 'world',
  };
});
