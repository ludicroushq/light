import { light, Route } from '../../src/index';

describe('serverless', () => {
  describe('netlify', () => {
    process.env.LIGHT_ENVIRONMENT = 'netlify';

    const server: any = light(class Index extends Route {
      public async handler() {
        return {
          hello: 'world',
        };
      }
    });

    it('exports a handler', async () => {
      expect.assertions(3);
      expect(server).toBeTruthy();
      expect(server.handler).toBeTruthy();
      expect(typeof server.handler).toBe('function');
    });
  });
});
