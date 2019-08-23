import { route } from '../../src/index';

module.exports = route({
  path: '/youch',
  handler() {
    throw new Error('hello youch');
  },
});
