const { createRoute } = require('light');

module.exports = createRoute(() => {
  return {
    async GET({ req }) {
      return {
        hello: req.params.username,
      };
    }
  }
});
