import { Route } from '../src/index';

describe('route', () => {
  describe('without opts', () => {
    it('does not throw', async () => {
      expect.assertions(1);
      expect(() => new Route({
        req: ({} as any),
        res: ({} as any),
      })).not.toThrow();
    });
  });
});
