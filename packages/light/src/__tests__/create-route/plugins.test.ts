import { join } from 'path';
import supertest from 'supertest';
import { createTest } from '../../index';

describe('createRoute', () => {
  describe('plugins', () => {
    describe('with plugin', () => {
      it('returns the correct plugin value', async () => {
        const cwd = jest.spyOn(process, 'cwd');
        cwd.mockReturnValue(join(__dirname, './seeds/with-plugin'));

        const { server } = createTest();

        const get = await supertest(server).get('/');
        expect(get.status).toStrictEqual(200);
        expect(get.body).toMatchObject({
          hello: 'world',
          plugin: true,
        });

        cwd.mockRestore();
      });
    });
  });
});
