import addRoute from '../../src/utils/add-route';

describe('utils', () => {
  describe('add route', () => {
    describe('with basic route', () => {
      const router = {
        on: jest.fn(),
      };

      const route = {
        path: '/',
        method: 'GET',
        handler: jest.fn(),
      };

      it('adds the route', async () => {
        expect.assertions(2);
        addRoute(router, route);
        expect(router.on.mock.calls.length).toBe(1);
        expect(router.on).toHaveBeenCalledWith(['GET'], '/', expect.any(Function));
      });
    });

    describe('with array of methods', () => {
      const router = {
        on: jest.fn(),
      };

      const route = {
        path: '/',
        method: ['GET', 'POST', 'PUT', 'patch', 'OPTIONS'],
        handler: jest.fn(),
      };

      it('adds the route', async () => {
        expect.assertions(2);
        addRoute(router, route);
        expect(router.on.mock.calls.length).toBe(1);
        expect(router.on).toHaveBeenCalledWith(['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS'], '/', expect.any(Function));
      });
    });

    describe('without method', () => {
      const router = {
        on: jest.fn(),
      };

      const route = {
        path: '/',
        handler: jest.fn(),
      };

      it('adds the route', async () => {
        expect.assertions(2);
        addRoute(router, (route as any));
        expect(router.on.mock.calls.length).toBe(1);
        expect(router.on).toHaveBeenCalledWith(['GET'], '/', expect.any(Function));
      });
    });

    describe('with array of paths', () => {
      const router = {
        on: jest.fn(),
      };

      const route = {
        path: ['/', '/a', '/b'],
        method: 'GET',
        handler: jest.fn(),
      };

      it('adds the routes', async () => {
        expect.assertions(4);
        addRoute(router, route);
        expect(router.on.mock.calls.length).toBe(3);
        expect(router.on).toHaveBeenCalledWith(['GET'], '/', expect.any(Function));
        expect(router.on).toHaveBeenCalledWith(['GET'], '/a', expect.any(Function));
        expect(router.on).toHaveBeenCalledWith(['GET'], '/b', expect.any(Function));
      });
    });

    describe('with index route', () => {
      const router = {
        on: jest.fn(),
      };

      const route = {
        path: '/index',
        method: 'GET',
        handler: jest.fn(),
      };

      it('adds root and index routes', async () => {
        expect.assertions(3);
        addRoute(router, route);
        expect(router.on.mock.calls.length).toBe(2);
        expect(router.on).toHaveBeenCalledWith(['GET'], '/index', expect.any(Function));
        expect(router.on).toHaveBeenCalledWith(['GET'], '/', expect.any(Function));
      });
    });

    describe('with nested route', () => {
      const router = {
        on: jest.fn(),
      };

      const route = {
        path: '/multi/level',
        method: 'GET',
        handler: jest.fn(),
      };

      it('adds the nested route', async () => {
        expect.assertions(2);
        addRoute(router, route);
        expect(router.on.mock.calls.length).toBe(1);
        expect(router.on).toHaveBeenCalledWith(['GET'], '/multi/level', expect.any(Function));
      });
    });
  });
});
