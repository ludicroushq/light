import {
  createRoute,
  createServer,
  createTest,
  logger,
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
});
