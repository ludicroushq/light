import { join } from 'path';
import listen from 'test-listen';
import { resolve } from 'url';
import fetch from 'node-fetch';
import light from '../src/index';

const app = light({
  routes: join(__dirname, 'seeds/routes'),
});
let url: string;

beforeAll(async () => {
  url = await listen(app.server);
});

afterAll(() => app.server.close());

describe('routes', () => {
  describe('route', () => {
    it('should work', async () => {
      expect.assertions(2);
      const req = await fetch(resolve(url, '/route'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'route world' });
    });

    it('should work with default export', async () => {
      expect.assertions(2);
      const req = await fetch(resolve(url, '/route-default'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'default route world' });
    });

    it('should work with missing path', async () => {
      expect.assertions(2);
      const req = await fetch(resolve(url, '/api/v1/route-missing-path'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'nested route world missing url' });
    });

    it('should work with a custom path', async () => {
      expect.assertions(2);
      const req = await fetch(resolve(url, '/api/v1/extra/route'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'nested route world' });
    });
  });
});
