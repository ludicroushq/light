const { createRoute, logger } = require('light');
const { route, get } = createRoute();

get(() => {
  logger.info('hello logs!');

  return {
    hello: 'vercel with light!',
  };
});

module.exports = route;
