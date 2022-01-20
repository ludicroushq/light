const { createRoute, useLogger } = require('light');

const logger = useLogger()

module.exports = createRoute(() => {
  return {
    async GET() {
      logger.info('hello logs!');

      return {
        hello: 'vercel with light!',
      };
    }
  }
})
