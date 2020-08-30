import { join } from 'path';

import genRoutes from '../../gen-routes';

describe('gen-routes', () => {
  it('works with default exports', () => {
    const routes = genRoutes(['index.js'], join(__dirname, './seeds/with-default'));
    expect(routes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/',
          file: join(__dirname, './seeds/with-default/routes/index.js'),
        }),
      ]),
    );
  });

  it('works with dynamic routes', () => {
    const routes = genRoutes(['[params].js'], join(__dirname, './seeds/with-params'));
    expect(routes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/:params',
          file: join(__dirname, './seeds/with-params/routes/[params].js'),
        }),
      ]),
    );
  });

  it('works with nested index routes', () => {
    const routes = genRoutes(['test/index.js'], join(__dirname, './seeds/with-nested-index'));
    expect(routes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/test',
          file: join(__dirname, './seeds/with-nested-index/routes/test/index.js'),
        }),
      ]),
    );
  });
});
