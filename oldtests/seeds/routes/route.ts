import { route } from '../../../src/index';

module.exports = route({
  path: '/route',
  handler() {
    return {
      hello: 'route world',
    };
  },
});
