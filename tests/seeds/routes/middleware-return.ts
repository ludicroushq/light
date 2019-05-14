import { route, send } from '../../../src/index';
import { IncomingMessage, ServerResponse } from 'http';

const middleware = (req: IncomingMessage, res: ServerResponse): void => {
  send(res, 200, { hello: 'middleware' })
}

module.exports = route({
  path: '/middleware-return',

  middleware: [
    middleware
  ],

  handler(req: any) {
    /* istanbul ignore next */
    return {
      hello: 'world',
    };
  },
});
