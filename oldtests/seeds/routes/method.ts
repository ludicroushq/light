import { route } from '../../../src/index';

module.exports = route({
  path: '/method',

  method: 'POST',

  handler(req: any) {
    return {
      hello: req.method,
    };
  },
});
