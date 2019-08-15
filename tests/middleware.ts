import { resolve } from 'url';
import fetch from 'node-fetch';
import { IncomingMessage, ServerResponse } from 'http';

import { test, send } from '../src/index';

let server: any;
let middleware: any;
beforeEach(async () => {
  server = await test({
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
});

afterEach(async () => {
  server.close();
});

describe('middleware', () => {
  beforeAll(() => {
    middleware = (req: any): void => {
      req.hello = 'world';
    };
  });

  it('should work', async () => {
    expect.assertions(2);
    const req = await fetch(resolve(server.url, '/middleware'));
    const res = await req.json();
    expect(req.status).toStrictEqual(200);
    expect(res).toMatchObject({ hello: 'world' });
  });

  describe('with early return', () => {
    beforeAll(() => {
      middleware = (req: IncomingMessage, res: ServerResponse): void => {
        send(res, 200, { hello: 'middleware' });
      };
    });

    it('should work', async () => {
      expect.assertions(2);
      const req = await fetch(resolve(server.url, '/middleware'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'middleware' });
    });
  });
});
