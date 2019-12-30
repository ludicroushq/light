import fetch from 'node-fetch';
import listen from 'test-listen';
import { join } from 'path';

import complexRouter from './seeds/router/complex-routes';

import {
  server,
} from '../src/index';

let app: any;
let url: any;

beforeEach(async () => {
  url = await listen(app.server);
});

afterEach(async () => {
  app.server.close();
});

describe('router', () => {
  describe('with router file', () => {
    beforeAll(() => {
      app = server({
        routes: join(__dirname, './seeds/router/routes'),
        opts: { requestLogger: false },
      });
    });

    it('works with root path', async () => {
      expect.assertions(2);
      const req = await fetch(url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'router' });
    });

    it('works with non-file related path', async () => {
      expect.assertions(2);
      const req = await fetch(`${url}/testing`);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'router' });
    });
  });

  describe('with complex router', () => {
    it('returns the correct routes', async () => {
      expect(complexRouter).toMatchObject([{ method: 'GET', path: ['/home', '/test'], handler: '/index' },
        {
          method: 'POST',
          path: ['/testing/index'],
          handler: '/testing',
        },
        {
          method:
         ['ACL',
           'BIND',
           'CHECKOUT',
           'CONNECT',
           'COPY',
           'DELETE',
           'GET',
           'HEAD',
           'LINK',
           'LOCK',
           'M-SEARCH',
           'MERGE',
           'MKACTIVITY',
           'MKCALENDAR',
           'MKCOL',
           'MOVE',
           'NOTIFY',
           'OPTIONS',
           'PATCH',
           'POST',
           'PROPFIND',
           'PROPPATCH',
           'PURGE',
           'PUT',
           'REBIND',
           'REPORT',
           'SEARCH',
           'SOURCE',
           'SUBSCRIBE',
           'TRACE',
           'UNBIND',
           'UNLINK',
           'UNLOCK',
           'UNSUBSCRIBE'],
          path: ['/graphql'],
          handler: '/graphql',
        },
        {
          method: 'GET',
          path: ['/api/v1/test'],
          handler: '/api/v1/test',
        }]);
    });
  });
});
