import { createRoute } from '../../index';

describe('serverless', () => {
  describe('now', () => {
    process.env.LIGHT_ENV = 'now';

    const { route } = createRoute('now');
    const server: any = route(() => ({
      hello: 'world',
    }));

    it('exports a function', async () => {
      expect.assertions(2);
      expect(server).toBeTruthy();
      expect(typeof server).toBe('function');
    });
  });
});
