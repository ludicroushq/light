import { createRoute } from '../../index';

describe('serverless', () => {
  describe('runkit', () => {
    process.env.LIGHT_ENV = 'runkit';

    const { route } = createRoute('runkit');
    const server: any = route(() => ({
      hello: 'world',
    }));

    it('exports a function', async () => {
      expect.assertions(3);
      expect(server).toBeTruthy();
      expect(server.endpoint).toBeTruthy();
      expect(typeof server.endpoint).toBe('function');
    });
  });
});
