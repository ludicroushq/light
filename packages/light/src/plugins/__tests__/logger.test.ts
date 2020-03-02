import request from 'supertest';

import { createServer, createRoute } from '../../index';

const { route } = createRoute('test');
const { server } = createServer({
  routes: [
    {
      handler: route(() => ({
        hello: 'world',
      })),
      path: '/',
    },
  ],
  opts: { requestLogger: true, dev: false },
});

describe('plugins', () => {
  describe('request logger', () => {
    describe('with logger enabled', () => {
      it('logs', async () => {
        expect.assertions(6);
        const spy = jest.spyOn(process.stdout, 'write').mockImplementation();
        const response = await request(server).get('/');
        expect(response.status).toStrictEqual(200);
        expect(response.body).toMatchObject({ hello: 'world' });
        expect(spy).toHaveBeenCalledTimes(1);
        const log = JSON.parse(spy.mock.calls[0][0]);
        expect(log.req).toHaveProperty('method', 'GET');
        expect(log.req).toHaveProperty('url', '/');
        expect(log.res).toHaveProperty('statusCode', 200);
        spy.mockRestore();
      });
    });
  });
});
