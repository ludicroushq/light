import { createRoute } from '../../index';

describe('serverless', () => {
  describe('netlify', () => {
    process.env.LIGHT_ENV = 'netlify';

    const { route } = createRoute('netlify');
    const server: any = route(() => ({
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
