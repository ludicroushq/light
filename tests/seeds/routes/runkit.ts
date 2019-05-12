import { route } from '../../../src/index';

module.exports = route({
  path: '/runkit',
  handler() {
    return {
      hello: 'runkit world',
    };
  },
});
