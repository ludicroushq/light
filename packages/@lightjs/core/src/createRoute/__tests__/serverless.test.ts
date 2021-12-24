/* eslint-disable global-require */
describe('runkit', () => {
  it('returns the correct handler', () => {
    process.env.LIGHT_ENV = 'runkit';
    jest.resetModules();
    const { route } = require('../index');
    const handler = route(() => ({
      async GET() {
        return 'ok';
      },
    }));
    expect(handler.endpoint).toBeTruthy();
    process.env.LIGHT_ENV = undefined;
  });
});

describe('with netlify', () => {
  it('returns the correct handler', () => {
    process.env.LIGHT_ENV = 'netlify';
    jest.resetModules();
    const { route } = require('../index');
    const handler = route(() => ({
      async GET() {
        return 'ok';
      },
    }));
    expect(handler.handler).toBeTruthy();
    process.env.LIGHT_ENV = undefined;
  });
});

describe('with aws', () => {
  it('returns the correct handler', () => {
    process.env.LIGHT_ENV = 'aws';
    jest.resetModules();
    const { route } = require('../index');
    const handler = route(() => ({
      async GET() {
        return 'ok';
      },
    }));
    expect(handler.handler).toBeTruthy();
    process.env.LIGHT_ENV = undefined;
  });
});

describe('with now', () => {
  it('returns the correct handler', () => {
    process.env.LIGHT_ENV = 'now';
    jest.resetModules();
    const { route } = require('../index');
    const handler = route(() => ({
      async GET() {
        return 'ok';
      },
    }));
    expect(typeof handler).toBe('function');
    process.env.LIGHT_ENV = undefined;
  });
});
