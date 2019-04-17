import { join } from 'path';
import listen from 'test-listen';
import { resolve } from 'url';
import fetch from 'node-fetch';
import Light from '../src/index';

const light = new Light({
  routes: join(__dirname, 'seeds/routes'),
});
let url: string;

beforeAll(async () => {
  url = await listen(light.server);
});

afterAll(() => light.server.close());

describe('routes', () => {
  describe('objects', () => {
    it('should work', async () => {
      expect.assertions(2);
      const req = await fetch(resolve(url, '/object'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'object world' });
    });

    it('should work in folders with a custom route', async () => {
      expect.assertions(2);
      const req = await fetch(resolve(url, '/api/v1/extra/object'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'extra object world' });
    });

    it('should work with default export', async () => {
      expect.assertions(2);
      const req = await fetch(resolve(url, '/default-object'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'default object world' });
      expect.assertions(2);
    });


    it('should work with missing url/path', async () => {
      expect.assertions(2);
      const req = await fetch(resolve(url, '/object-missing-url'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'missing url world' });
    });

    it('should work with missing url/path in a nested folder', async () => {
      expect.assertions(2);
      const req = await fetch(resolve(url, '/api/v1/object-missing-url'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'missing nested url world' });
    });

    it('should not work with missing handler', async () => {
      expect.assertions(1);
      expect(() => {
        const server = new Light({
          routes: join(__dirname, 'seeds/errors/object-missing-handler.ts'),
        });
        return server;
      }).toThrow();
    });
  });
});
