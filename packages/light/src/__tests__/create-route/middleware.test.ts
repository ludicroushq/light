import { join } from 'path';
import supertest from 'supertest';
import { createTest } from '../../index';

describe('createRoute', () => {
  describe('middleware', () => {
    describe('with one middleware', () => {
      it('returns the correct middleware value', async () => {
        const cwd = jest.spyOn(process, 'cwd');
        cwd.mockReturnValue(join(__dirname, './seeds/with-middleware'));

        const { server } = createTest();

        const get = await supertest(server).get('/');
        expect(get.status).toStrictEqual(200);
        expect(get.body).toMatchObject({ test: true });

        cwd.mockRestore();
      });
    });

    describe('with short circuit middleware', () => {
      it('returns the short circuit middleware value', async () => {
        const cwd = jest.spyOn(process, 'cwd');
        cwd.mockReturnValue(join(__dirname, './seeds/with-short-circuit-middleware'));

        const { server } = createTest();

        const get = await supertest(server).get('/');
        expect(get.status).toStrictEqual(200);
        expect(get.text).toBe('short circuit!');

        cwd.mockRestore();
      });
    });
  });
});
