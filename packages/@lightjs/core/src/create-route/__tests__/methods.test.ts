import { HTTPMethod } from 'find-my-way';
import { METHODS } from 'http';
import { createRoute } from '../index';

it('exports methods', () => {
  const useRoute = createRoute();
  expect(Object.keys(useRoute).sort()).toEqual([...METHODS, 'route', 'useMiddleware'].sort());
});

it.each(METHODS)('supports http methods', (method) => {
  const useRoute = createRoute();
  const fn = useRoute[method as HTTPMethod];
  expect(fn).toBeTruthy();
  fn(() => ({
    hello: 'world',
  }));
  expect(useRoute.route).toMatchObject({
    middleware: [],
    [method]: {
      handler: expect.any(Function),
      middleware: [],
    },
  });
});
