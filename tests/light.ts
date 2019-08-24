import fetch from 'node-fetch';

import { test, light, Route } from '../src/index';

let handler: any = class Index extends Route {
  public async handler() {
    return {
      hello: 'world',
    };
  }
};

let server: any;

beforeEach(async () => {
  server = await test(light(handler));
});

afterEach(async () => {
  server.close();
});

describe('light', () => {
  describe('with regular class that extends Route', () => {
    it('returns object properly', async () => {
      expect.assertions(2);
      const req = await fetch(server.url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'world' });
    });
  });

  describe('with default export', () => {
    describe('with class', () => {
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

    describe('with non-class', () => {
      it('throws exception', async () => {
        expect.assertions(1);
        expect(() => light({ default: () => {} })).toThrow('route is not a class');
      });
    });
  });

  describe('with null', () => {
    it('throws exception', async () => {
      expect.assertions(1);
      expect(() => light(null)).toThrow('route is missing');
    });
  });

  describe('with non-class', () => {
    it('throws exception', async () => {
      expect.assertions(1);
      expect(() => light(() => {})).toThrow('route is not a class');
    });
  });
});
