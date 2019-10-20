import fetch from 'node-fetch';
import listen from 'test-listen';
import { join } from 'path';

import {
  server,
  route,
} from '../src/index';

let app: any;
let url: any;

beforeEach(async () => {
  url = await listen(app.server);
});

afterEach(async () => {
  app.server.close();
});

describe('server', () => {
  describe('with functions as routes', () => {
    beforeAll(() => {
      const { handler } = route({ requestLogger: false });
      app = server({
        routes: [
          {
            handler: handler(() => ({
              hello: 'server',
            })),
            method: 'GET',
            path: '/',
          },
        ],
      });
    });

    it('returns an object', async () => {
      expect.assertions(2);
      const req = await fetch(url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'server' });
    });
  });

  describe('with string as routes', () => {
    beforeAll(() => {
      app = server({
        routes: join(__dirname, './seeds/server/routes'),
        opts: { requestLogger: false },
      });
    });

    it('returns an object', async () => {
      expect.assertions(2);
      const req = await fetch(url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'server' });
    });
  });
});
