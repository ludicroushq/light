import { route } from '../../src/index';

describe('serverless', () => {
  describe('runkit', () => {
    process.env.LIGHT_ENV = 'runkit';

    const { handler } = route();
    const server: any = handler(() => ({
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
