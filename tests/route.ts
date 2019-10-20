import fetch from 'node-fetch';

import { test, route } from '../src/index';

let handler: any = (): any => ({
  hello: 'world',
});

let server: any;

beforeEach(async () => {
  const { handler: fn } = route();
  server = await test(fn(handler));
});

afterEach(async () => {
  server.close();
});

describe('route', () => {
  describe('with regular function', () => {
    it('returns object properly', async () => {
      expect.assertions(2);
      const req = await fetch(server.url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'world' });
    });
  });

  describe('with default export', () => {
    describe('with function', () => {
      beforeAll(() => {
        handler = {
          default: handler,
        };
      });

      it('returns object properly', async () => {
        expect.assertions(2);
        const req = await fetch(server.url);
        const res = await req.json();
        expect(req.status).toStrictEqual(200);
        expect(res).toMatchObject({ hello: 'world' });
      });
    });
  });

  describe('with null', () => {
    it('throws exception', async () => {
      expect.assertions(1);
      const { handler: light } = route();
      // @ts-ignore
      expect(() => light(null)).toThrow('route is missing');
    });
  });
});
