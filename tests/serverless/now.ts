import { light, Route } from '../../src/index';

describe('serverless', () => {
  describe('now', () => {
    process.env.LIGHT_ENV = 'now';

    const server: any = light(class Index extends Route {
      public async handler() {
        return {
          hello: 'world',
        };
      }
    });

    it('exports a function', async () => {
      expect.assertions(2);
      expect(server).toBeTruthy();
      expect(typeof server).toBe('function');
    });
  });
});
