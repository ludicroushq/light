import { route } from '../../src/index';

describe('serverless', () => {
  describe('netlify', () => {
    process.env.LIGHT_ENV = 'netlify';

    const { handler } = route();
    const server: any = handler(() => ({
      hello: 'world',
    }));

    it('exports a handler', async () => {
      expect.assertions(3);
      expect(server).toBeTruthy();
      expect(server.handler).toBeTruthy();
      expect(typeof server.handler).toBe('function');
    });
  });
});
