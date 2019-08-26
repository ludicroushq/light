import { light, Route } from '../../src/index';

describe('serverless', () => {
  describe('runkit', () => {
    process.env.LIGHT_ENV = 'runkit';

    const server: any = light(class Index extends Route {
      public async handler() {
        return {
          hello: 'world',
        };
      }
    });

    it('exports a function', async () => {
      expect.assertions(3);
      expect(server).toBeTruthy();
      expect(server.endpoint).toBeTruthy();
      expect(typeof server.endpoint).toBe('function');
    });
  });
});