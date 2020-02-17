import { route } from '../../src/index';

describe('serverless', () => {
  describe('aws', () => {
    process.env.LIGHT_ENV = 'aws';

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
