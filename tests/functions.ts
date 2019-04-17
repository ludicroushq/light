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
  describe('functions', () => {
    it('should run', async () => {
      expect.assertions(2);
      const req = await fetch(resolve(url, '/function'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'world' });
    });

    it('should work with an index route', async () => {
      expect.assertions(2);
      const req = await fetch(resolve(url, '/'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'index' });
    });

    it('should work with any method', async () => {
      expect.assertions(2);
      // TODO: test all other methods
      const req = await fetch(resolve(url, '/function'), {
        method: 'POST',
      });
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'world' });
    });

    it('should work in folders', async () => {
      expect.assertions(2);
      const req = await fetch(resolve(url, '/api/v1/function'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'nested world' });
    });

    it('should work with default export', async () => {
      expect.assertions(2);
      const req = await fetch(resolve(url, '/default-function'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'default world' });
    });
  });
});
