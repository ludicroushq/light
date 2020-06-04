import { join } from 'path';
import supertest from 'supertest';
import { createTest } from '../../index';

describe('createRoute', () => {
  describe('errors', () => {
    describe('with createError', () => {
      it('returns the body', async () => {
        const cwd = jest.spyOn(process, 'cwd');
        const spy = jest.spyOn(console, 'error').mockImplementation();
        cwd.mockReturnValue(join(__dirname, './seeds/with-create-error'));

        const { server } = createTest();

        const get = await supertest(server).get('/');
        expect(get.status).toStrictEqual(401);
        expect(get.text).toBe('test should not fail');

        spy.mockRestore();
        cwd.mockRestore();
      });
    });

    describe('with sendError', () => {
      it('returns the body', async () => {
        const cwd = jest.spyOn(process, 'cwd');
        const spy = jest.spyOn(console, 'error').mockImplementation();
        cwd.mockReturnValue(join(__dirname, './seeds/with-send-error'));

        const { server } = createTest();

        const get = await supertest(server).get('/');
        expect(get.status).toStrictEqual(401);
        expect(get.text).toBe('test should not fail');

        spy.mockRestore();
        cwd.mockRestore();
      });
    });
  });
});
