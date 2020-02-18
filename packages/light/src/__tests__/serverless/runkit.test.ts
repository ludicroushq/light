import { createRoute } from '../../index';

describe('serverless', () => {
  describe('runkit', () => {
    process.env.LIGHT_ENV = 'runkit';

    const { withHandler } = createRoute('runkit');
    const server: any = withHandler(() => ({
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
