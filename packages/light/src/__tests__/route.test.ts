import fetch from 'node-fetch';

import { createTest, createRoute } from '../index';

let handler: any = (): any => ({
  hello: 'world',
});

let url: any;
let server: any;
beforeEach(async () => {
  const { withHandler: fn } = createRoute('test');
  server = createTest(fn(handler));
  url = await server.listen();
});

afterEach(async () => {
  server.close();
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
      const { withHandler: light } = createRoute('test');
      // @ts-ignore
      expect(() => light(null)).toThrow('please provide a function to withHandler');
    });
  });

  describe('without name', () => {
    it('throws exception', async () => {
      expect.assertions(1);
      // @ts-ignore
      expect(() => createRoute(null)).toThrow('route must have a unique name');
    });
  });
});
