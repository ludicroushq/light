import { join } from 'path';
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
        expect.assertions(2);
        const spy = jest.spyOn(process.stdout, 'write').mockImplementation();
        expect(() => importRoutes([join(routesPath, './throw.ts')], routesPath)).toThrow('please fix the route and try again');
        expect(spy).toHaveBeenCalledTimes(2);
        spy.mockRestore();
      });
    });
  });
});
