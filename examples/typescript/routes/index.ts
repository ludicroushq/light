import { IncomingMessage, ServerResponse } from 'http'
import { createRoute } from 'light';

const { route, addMiddleware, addPlugin } = createRoute('index');

addMiddleware(() => console.log('hi'));
addPlugin((fn: any) => async (req: IncomingMessage, res: ServerResponse) => {
  console.log('before');
  const result = await fn(req, res);
  console.log('after');
  return result;
});

module.exports = route(async (req: IncomingMessage) => {
  console.log(`recieving request at path: ${req.url}`);
  return {
    hello: 'world',
  };
});
