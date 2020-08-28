const { createRoute } = require('light');
const { route, GET } = createRoute();

GET(({ req }) => {
  return {
    hello: req.params.username,
  };
});

module.exports = route;
