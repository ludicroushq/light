import { route } from '../../../src/index';

const middleware = (req: any): void => {
  req.hello = 'world';
};

module.exports = route({
  path: '/middleware',

  middleware: [
    middleware,
  ],

  handler(req: any) {
    return {
      hello: req.hello,
    };
  },
});
