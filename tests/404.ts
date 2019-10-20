import fetch from 'node-fetch';
import join from 'url-join';

import {
  test, route,
} from '../src/index';

let server: any;

beforeEach(async () => {
  const { handler } = route();
  server = await test(handler(() => ({
    hello: 'world',
  })));
});

afterEach(async () => {
  server.close();
});

describe('404', () => {
  describe('with correct route', () => {
    it('returns data', async () => {
      expect.assertions(2);
      const req = await fetch(server.url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'world' });
    });
  });

  describe('with incorrect route', () => {
    it('returns a 404 error', async () => {
      expect.assertions(2);
      const req = await fetch(join(server.url, 'hello'));
      const res = await req.text();
      expect(req.status).toStrictEqual(404);
      expect(res).toBe('Not Found');
    });
  });
});
