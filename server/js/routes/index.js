const route = require('../../../lib/index'); // eslint-disable-line

module.exports = route({
  path: '/',
  middleware: [(req) => {
    req.message = 'test';
  }],
  async handler(req) {
    return { hello: 'hmr', message: req.message };
  },
});
