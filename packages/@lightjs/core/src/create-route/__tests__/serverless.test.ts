describe('runkit', () => {
  it('returns the correct handler', () => {
    process.env.LIGHT_ENV = 'runkit';
    jest.resetModules();
    const { createRoute } = require('../index');
    const { route } = createRoute();
    expect(route.endpoint).toBeTruthy();
    process.env.LIGHT_ENV = undefined;
  });
});

describe('with netlify', () => {
  it('returns the correct handler', () => {
    process.env.LIGHT_ENV = 'netlify';
    jest.resetModules();
    const { createRoute } = require('../index');
    const { route } = createRoute();
    expect(route.handler).toBeTruthy();
    process.env.LIGHT_ENV = undefined;
  });
});

describe('with aws', () => {
  it('returns the correct handler', () => {
    process.env.LIGHT_ENV = 'aws';
    jest.resetModules();
    const { createRoute } = require('../index');
    const { route } = createRoute();
    expect(route.handler).toBeTruthy();
    process.env.LIGHT_ENV = undefined;
  });
});

describe('with now', () => {
  it('returns the correct handler', () => {
    process.env.LIGHT_ENV = 'now';
    jest.resetModules();
    const { createRoute } = require('../index');
    const { route } = createRoute();
    expect(typeof route).toBe('function');
    process.env.LIGHT_ENV = undefined;
  });
});
