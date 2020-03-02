import request from 'supertest';

import { createServer, createRoute } from '../index';

let handler: any = (): any => ({
  hello: 'world',
});

let server: any;
beforeEach(async () => {
  const { route: fn } = createRoute('test');
  ({ server } = createServer({
    routes: [
      {
        handler: fn(handler),
        path: '/',
      },
    ],
    opts: { requestLogger: false },
  }));
});

describe('route', () => {
  describe('with regular function', () => {
    it('returns object properly', async () => {
      expect.assertions(2);
      const response = await request(server).get('/');
      expect(response.status).toStrictEqual(200);
      expect(response.body).toMatchObject({ hello: 'world' });
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
        const response = await request(server).get('/');
        expect(response.status).toStrictEqual(200);
        expect(response.body).toMatchObject({ hello: 'world' });
      });
    });
  });

  describe('with null', () => {
    it('throws exception', async () => {
      expect.assertions(1);
      const { route: light } = createRoute('test');
      // @ts-ignore
      expect(() => light(null)).toThrow('please provide a function to route');
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
