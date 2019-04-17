import { route } from '../../../../../src/index';

module.exports = route({
  handler() {
    return {
      hello: 'nested route world missing url',
    };
  },
});
