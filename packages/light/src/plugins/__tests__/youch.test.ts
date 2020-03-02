import request from 'supertest';

import { createServer, createRoute } from '../../index';

const { route } = createRoute('test');
const { server } = createServer({
  routes: [
    {
      handler: route(() => {
        throw new Error('hi');
      }),
      path: '/',
    },
  ],
  opts: { requestLogger: false, dev: true },
});

describe('plugins', () => {
  describe('youch', () => {
    describe('in dev mode', () => {
      it('youches the error', async () => {
        expect.assertions(3);
        const spy = jest.spyOn(console, 'log').mockImplementation();
        const response = await request(server).get('/');
        expect(response.status).toStrictEqual(200);
        expect(response.text).toContain('html');
        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockRestore();
      });
    });
  });
});
