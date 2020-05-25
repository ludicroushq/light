/* eslint-disable global-require */
import process from 'process';
import { join } from 'path';
import request from 'supertest';
import { createTest } from '../../index';

describe('create-test', () => {
  beforeEach(() => jest.resetModules());

  describe('with basic app', () => {
    it('creates a server', async () => {
      const spy = jest.spyOn(process, 'cwd');
      spy.mockReturnValue(join(__dirname, './seeds'));

      const app = createTest();

      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        hello: 'test',
      });
      spy.mockRestore();
    });
  });
});
