import { light, Route } from '../../src/index';

describe('now', () => {
  process.env.LIGHT_ENVIRONMENT = 'now';

  const server: any = light(class index extends Route {
    async handler() {
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
