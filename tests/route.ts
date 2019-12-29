import fetch from 'node-fetch';

import { test, route } from '../src/index';

let handler: any = (): any => ({
  hello: 'world',
});
const { handler: fn } = route();
const { listen, close } = test(fn(handler));

let url: any;
beforeEach(async () => {
  url = await listen();
});

afterEach(async () => {
  close();
});

describe('route', () => {
  describe('with regular function', () => {
    it('returns object properly', async () => {
      expect.assertions(2);
      const req = await fetch(url);
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
        const req = await fetch(url);
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
