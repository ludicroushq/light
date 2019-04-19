const { route } = require('../../../lib/index'); // eslint-disable-line

module.exports = route({
  path: '/',
  async handler() {
    return { hello: 'hmr' };
  },
}, {
  middleware: ['test'],
  middlewareRoot: './server/js/middleware',
});
