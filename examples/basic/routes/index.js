const { createRoute } = require('light');
const { route, GET } = createRoute();

GET(async () => {
  return {
    hello: 'world',
  };
});

module.exports = route;
