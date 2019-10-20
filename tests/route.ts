import fetch from 'node-fetch';

import { test, light, route } from '../src/index';

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

describe('light', () => {
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
      expect(() => light(null)).toThrow('route is missing');
    });
  });
});
