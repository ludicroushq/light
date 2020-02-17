import fetch from 'node-fetch';

import {
  useTest, useRoute, send,
} from '../index';

let mw: any = () => {};

let server: any;
let url: string;
beforeEach(async () => {
  const { withHandler, addMiddleware } = useRoute('test');
  addMiddleware(mw);
  server = useTest(withHandler((req: any): any => ({
    hello: req.message,
  })));
  url = await server.listen();
});

afterEach(async () => {
  server.close();
});

describe('middleware', () => {
  describe('with regular middleware', () => {
    beforeAll(() => {
      mw = (req: any) => { req.message = 'passed a message'; };
    });

    it('returns data from a middleware', async () => {
      expect.assertions(2);
      const req = await fetch(url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'passed a message' });
    });
  });

  describe('with middleware that returns early', () => {
    beforeAll(() => {
      mw = (_: any, res: import('http').ServerResponse) => { send(res, 200, 'middleware!!!'); };
    });

    it('returns early from a middleware', async () => {
      expect.assertions(2);
      const req = await fetch(url);
      const res = await req.text();
      expect(req.status).toStrictEqual(200);
      expect(res).toBe('middleware!!!');
    });
  });
});
