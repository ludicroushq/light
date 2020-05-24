import request from 'supertest';

import {
  createServer, createRoute,
} from '../index';

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
  opts: { requestLogger: false },
});

describe('404', () => {
  describe('with correct route', () => {
    it('returns data', async () => {
      expect.assertions(2);
      const response = await request(server).get('/');
      expect(response.status).toStrictEqual(200);
      expect(response.body).toMatchObject({ hello: 'world' });
    });
  });

  describe('with incorrect route', () => {
    it('returns a 404 error', async () => {
      expect.assertions(2);
      const response = await request(server).get('/hello');
      expect(response.status).toStrictEqual(404);
      expect(response.text).toBe('Not Found');
    });
  });
});
