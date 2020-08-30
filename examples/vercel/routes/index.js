const { createRoute, logger } = require('light');
const { route, GET } = createRoute();

GET(() => {
  logger.info('hello logs!');

  return {
    hello: 'vercel with light!',
  };
});

module.exports = route;
