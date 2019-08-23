import { route } from '../../../src/index';

module.exports = route({
  path: 'no-slash',
  handler() {
    return {
      hello: 'no-slash world',
    };
  },
});
