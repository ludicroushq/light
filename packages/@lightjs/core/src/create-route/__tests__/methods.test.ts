import { HTTPMethod } from 'find-my-way';
import { METHODS } from 'http';
import { createRoute } from '../index';

it('exports methods', () => {
  const useRoute = createRoute();
  expect(useRoute).toMatchInlineSnapshot(`
    Object {
      "ACL": [Function],
      "BIND": [Function],
      "CHECKOUT": [Function],
      "CONNECT": [Function],
      "COPY": [Function],
      "DELETE": [Function],
      "GET": [Function],
      "HEAD": [Function],
      "LINK": [Function],
      "LOCK": [Function],
      "M-SEARCH": [Function],
      "MERGE": [Function],
      "MKACTIVITY": [Function],
      "MKCALENDAR": [Function],
      "MKCOL": [Function],
      "MOVE": [Function],
      "NOTIFY": [Function],
      "OPTIONS": [Function],
      "PATCH": [Function],
      "POST": [Function],
      "PROPFIND": [Function],
      "PROPPATCH": [Function],
      "PURGE": [Function],
      "PUT": [Function],
      "REBIND": [Function],
      "REPORT": [Function],
      "SEARCH": [Function],
      "SOURCE": [Function],
      "SUBSCRIBE": [Function],
      "TRACE": [Function],
      "UNBIND": [Function],
      "UNLINK": [Function],
      "UNLOCK": [Function],
      "UNSUBSCRIBE": [Function],
      "route": Object {
        "middleware": Array [],
      },
      "useMiddleware": [Function],
    }
  `);
});

it.each(METHODS)('supports http methods', (method) => {
  const useRoute = createRoute();
  const fn = useRoute[method as HTTPMethod];
  expect(fn).toBeTruthy();
  fn(() => ({
    hello: 'world',
  }));
  expect(useRoute.route).toMatchObject({
    middleware: [],
    [method]: {
      handler: expect.any(Function),
      middleware: [],
    },
  });
});
