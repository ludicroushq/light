import { light } from '../src/index';

process.env.LIGHT_ENVIRONMENT = 'runkit';

const route = light({
  path: '/runkit',
  handler() {
    return {
      hello: 'runkit world',
    };
  },
});

describe('with runkit environment', () => {
  test('the route exports an endpoit', () => {
    expect.assertions(1);
    expect(route.endpoint).toBeTruthy();
  });
});
