const { createRoute } = require('light');

module.exports = createRoute(() => {
  return {
    async GET() {
      return {
        hello: 'world',
      };
    }
  }
});
