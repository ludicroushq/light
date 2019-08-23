import fetch from 'node-fetch';

import { test, light, Route, send } from '../src/index';

let middleware: any = () => {};
let server: any;

beforeEach(async () => {
  server = await test(light(class index extends Route {
    middleware = [middleware];

    async handler() {
      return {
        hello: (this.req as any).message,
      };
    }
  }));
});

afterEach(async () => {
  server.close();
});

describe('middleware', () => {
  describe('with regular middleware', () => {
    beforeAll(() => {
      middleware = (req: any) => { req.message = 'middleware!!!' }
    });

    it('returns data from a middleware', async () => {
      expect.assertions(2);
      const req = await fetch(server.url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'middleware!!!' });
    });
  })

  describe('with middleware that returns early', () => {
    beforeAll(() => {
      middleware = (_: any, res: import('http').ServerResponse) => { send(res, 200, 'middleware!!!') }
    });

    it('returns early from a middleware', async () => {
      expect.assertions(2);
      const req = await fetch(server.url);
      const res = await req.text();
      expect(req.status).toStrictEqual(200);
      expect(res).toBe('middleware!!!');
    });
  })
});
