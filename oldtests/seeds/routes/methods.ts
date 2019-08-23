import { route } from '../../../src/index';

module.exports = route({
  path: '/methods',

  method: ['GET', 'POST'],

  handler(req: any) {
    return {
      hello: req.method,
    };
  },
});
