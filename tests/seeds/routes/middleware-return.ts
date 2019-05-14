import { IncomingMessage, ServerResponse } from 'http';
import { route, send } from '../../../src/index';

const middleware = (req: IncomingMessage, res: ServerResponse): void => {
  send(res, 200, { hello: 'middleware' });
};

module.exports = route({
  path: '/middleware-return',

  middleware: [
    middleware,
  ],

  handler() {
    /* istanbul ignore next */
    return {
      hello: 'world',
    };
  },
});
