import { join } from 'path';
import request from 'supertest';

import {
  createTest,
} from '../../packages/light/src/index';

describe('createRoute', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('basic app', () => {
    it('returns the server', async () => {
      expect.assertions(2);
      const spy = jest.spyOn(process, 'cwd');
      spy.mockReturnValue(join(__dirname, './seeds/create-test/basic'));
      const { server } = createTest();
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ hello: 'world' });
      spy.mockRestore();
    });
  });

  describe('app with globals', () => {
    it('finds and returns the config', async () => {
      expect.assertions(2);
      const spy = jest.spyOn(process, 'cwd');
      spy.mockReturnValue(join(__dirname, './seeds/create-test/global'));
      const { server } = createTest();
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ hello: 'world' });
      spy.mockRestore();
    });
  });
});
