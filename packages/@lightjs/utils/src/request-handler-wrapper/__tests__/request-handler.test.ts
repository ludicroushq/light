import { requestHandlerWrapper } from '../index';

it('returns handlers', () => {
  const handler = (handler: any) => handler;
  expect(requestHandlerWrapper(handler)({} as any, {} as any, {}, {})).toMatchInlineSnapshot(`
    Object {
      "buffer": [Function],
      "createError": [Function],
      "json": [Function],
      "req": Object {
        "params": Object {},
        "query": Object {},
      },
      "res": Object {},
      "send": [Function],
      "sendError": [Function],
      "text": [Function],
    }
  `);
});
