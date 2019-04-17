import { route } from '../../../../../src/index';

module.exports = route({
  path: '/api/v1/extra/route',
  handler() {
    return {
      hello: 'nested route world',
    };
  },
});
