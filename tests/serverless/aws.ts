import { light, Route } from '../../src/index';

describe('aws', () => {
  process.env.LIGHT_ENVIRONMENT = 'aws';

  const server: any = light(class index extends Route {
    async handler() {
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
