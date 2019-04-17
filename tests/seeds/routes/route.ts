import { route } from '../../../src/index';

export default route({
  path: '/route',
  handler() {
    return {
      hello: 'world',
    };
  },
});
