import {
  createRoute,
  createServer,
  createTest,
  logger,
  createConfig,
  createLogger,
  withConnect,
} from '../../index';

describe('index', () => {
  it('exports createRoute', () => {
    expect(createRoute).toBeTruthy();
  });

  it('exports createServer', () => {
    expect(createServer).toBeTruthy();
  });

  it('exports createTest', () => {
    expect(createTest).toBeTruthy();
  });

  it('exports logger', () => {
    expect(logger).toBeTruthy();
  });

  it('exports createConfig', () => {
    expect(createConfig).toBeTruthy();
  });

  it('exports createLogger', () => {
    expect(createLogger).toBeTruthy();
  });

  it('exports withConnect', () => {
    expect(withConnect).toBeTruthy();
  });
});
