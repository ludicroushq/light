import { route } from '../../src/index';

describe('serverless', () => {
  describe('now', () => {
    process.env.LIGHT_ENV = 'now';

    const { handler } = route();
    const server: any = handler(() => ({
      hello: 'world',
    }));

    it('exports a function', async () => {
      expect.assertions(2);
      expect(server).toBeTruthy();
      expect(typeof server).toBe('function');
    });
  });
});
