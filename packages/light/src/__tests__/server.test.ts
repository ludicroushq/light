import fetch from 'node-fetch';
import listen from 'test-listen';

import {
  server,
  useRoute,
} from '../index';

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
      const { withHandler } = useRoute('test');
      app = server({
        routes: [
          {
            handler: withHandler(() => ({
              hello: 'server',
            })),
            path: '/',
          },
        ],
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
