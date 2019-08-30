import listen from 'test-listen';
import fetch from 'node-fetch';
import { join } from 'path';

import { server } from '../../src/index';
import importRoutes from '../../src/utils/import-routes';

const routesPath = join(__dirname, '../seeds/utils/add-routes/routes');

describe('utils', () => {
  describe('import routes', () => {
    describe('with regular route', () => {
      it('returns a route', async () => {
        expect.assertions(1);
        const route = importRoutes([join(routesPath, './index.ts')], routesPath);
        expect(route.length).toBe(1);
      });
    });

    describe('with default route', () => {
      it('returns a route', async () => {
        expect.assertions(1);
        const route = importRoutes([join(routesPath, './default.ts')], routesPath);
        expect(route.length).toBe(1);
      });
    });

    describe('with an invalid route', () => {
      it('throws', async () => {
        expect.assertions(1);
        expect(() => importRoutes([join(routesPath, './throw.ts')], routesPath)).toThrow('error');
      });
    });

    // created another file youch as the previous "throw" test causes issues if you use the same file
    describe('with safe mode', () => {
      it('returns a single route containing the youch error page', async () => {
        expect.assertions(5);
        const routes = importRoutes([join(routesPath, './youch.ts')], routesPath, true);
        expect(routes.length).toBe(1);
        expect(Object.keys(routes[0]).sort()).toEqual(['handler', 'method', 'path'].sort());

        const app = server({
          routes,
          opts: { disableRequestLogger: true },
        });
        const spy = jest.spyOn(console, 'log').mockImplementation();

        const url = await listen(app.server);
        const req = await fetch(url);
        const res = await req.text();
        expect(req.status).toStrictEqual(200);
        expect(res).toContain('html');
        expect(spy).toHaveBeenCalledTimes(1);

        spy.mockRestore();
        app.server.close();
      });
    });
  });
});
