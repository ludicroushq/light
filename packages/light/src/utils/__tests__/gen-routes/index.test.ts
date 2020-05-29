import { join } from 'path';

import genRoutes from '../../gen-routes';

describe('gen-routes', () => {
  it('works with default exports', () => {
    const routes = genRoutes(['index.js'], join(__dirname, './seeds/default'));
    expect(routes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/index',
          location: join(__dirname, './seeds/default/routes/index.js'),
        }),
      ]),
    );
  });

  it('works with dynamic routes', () => {
    const routes = genRoutes(['[params].js'], join(__dirname, './seeds/params'));
    expect(routes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/:params',
          location: join(__dirname, './seeds/params/routes/[params].js'),
        }),
      ]),
    );
  });
});
