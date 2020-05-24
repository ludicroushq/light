import request from 'supertest';

import {
  createServer, createRoute, send,
} from '../index';

let mw: any = () => {};

let server: any;
beforeEach(async () => {
  const { route, addMiddleware } = createRoute('test');
  addMiddleware(mw);
  ({ server } = createServer({
    routes: [
      {
        handler: route((req: any): any => ({
          hello: req.message,
        })),
        path: '/',
      },
    ],
    opts: { requestLogger: false },
  }));
});

describe('middleware', () => {
  describe('with regular middleware', () => {
    beforeAll(() => {
      mw = (req: any) => { req.message = 'passed a message'; };
    });

    it('returns data from a middleware', async () => {
      expect.assertions(2);
      const response = await request(server).get('/');
      expect(response.status).toStrictEqual(200);
      expect(response.body).toMatchObject({ hello: 'passed a message' });
    });
  });

  describe('with middleware that returns early', () => {
    beforeAll(() => {
      mw = (_: any, res: import('http').ServerResponse) => { send(res, 200, 'middleware!!!'); };
    });

    it('returns early from a middleware', async () => {
      expect.assertions(2);
      const response = await request(server).get('/');
      expect(response.status).toStrictEqual(200);
      expect(response.text).toBe('middleware!!!');
    });
  });
});
