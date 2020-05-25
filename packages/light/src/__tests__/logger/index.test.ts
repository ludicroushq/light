/* eslint-disable global-require */
import process from 'process';
import { join } from 'path';

describe('logger', () => {
  beforeEach(() => jest.resetModules());

  describe('without config', () => {
    it('returns console', async () => {
      const { logger } = require('../../index');
      expect(logger).toMatchObject(console);
    });
  });

  describe('with config', () => {
    it('returns the custom logger', async () => {
      const spy = jest.spyOn(process, 'cwd');
      spy.mockReturnValue(join(__dirname, './seeds/with-config'));
      const { logger } = require('../../index');
      expect(logger).toBe('this is a custom logger');
      spy.mockRestore();
    });
  });
});
