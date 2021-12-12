import { createRoute } from '../index';

const mw = () => async () => ({ hello: 'world' });

it('supports global middleware', () => {
  const { useMiddleware, route } = createRoute();
  useMiddleware(mw);

  expect(route).toMatchObject({
    middleware: [expect.any(Function)],
  });
});

it('supports multiple global middleware', () => {
  const { useMiddleware, route } = createRoute();

  useMiddleware([mw, mw, mw]);

  expect(route).toMatchObject({
    middleware: [expect.any(Function), expect.any(Function), expect.any(Function)],
  });
});

it('supports route level middleware', () => {
  const { GET, route } = createRoute();
  GET(() => 'hello world', { middleware: [mw] });
  expect(route).toMatchObject({
    middleware: [],
    GET: {
      handler: expect.any(Function),
      middleware: [expect.any(Function)],
    },
  });
});
