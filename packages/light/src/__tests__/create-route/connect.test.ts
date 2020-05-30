import { join } from 'path';
import supertest from 'supertest';
import { createTest } from '../../index';

describe('createRoute', () => {
  describe('connect', () => {
    describe('with connect middleware', () => {
      it('returns the correct middleware value', async () => {
        const cwd = jest.spyOn(process, 'cwd');
        cwd.mockReturnValue(join(__dirname, './seeds/with-connect'));

        const { server } = createTest();

        const get = await supertest(server).get('/');
        expect(get.status).toStrictEqual(200);
        expect(get.body).toMatchObject({ test: true });

        cwd.mockRestore();
      });
    });
  });
});
