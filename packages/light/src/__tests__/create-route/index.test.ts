import { join } from 'path';
import supertest from 'supertest';
import { createTest } from '../../index';

describe('createRoute', () => {
  describe('misc', () => {
    describe('with plugin and middleware', () => {
      it('works correctly', async () => {
        const cwd = jest.spyOn(process, 'cwd');
        cwd.mockReturnValue(join(__dirname, './seeds/with-plugin-and-middleware'));

        const { server } = createTest();

        const get = await supertest(server).get('/');
        expect(get.status).toStrictEqual(200);
        expect(get.body).toMatchObject({
          hello: 'world',
          middleware: true,
          plugin: true,
        });

        cwd.mockRestore();
      });
    });
  });
});
