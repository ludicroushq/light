import { route } from '../../../src/index';

export default route({
  path: '/route-default',
  handler() {
    return {
      hello: 'default route world',
    };
  },
});
