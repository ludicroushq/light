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
  describe('functions', () => {
    it('should run', async () => {
      expect.assertions(2);
      const req = await fetch(resolve(url, '/function'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'world' });
    });
  });
});
