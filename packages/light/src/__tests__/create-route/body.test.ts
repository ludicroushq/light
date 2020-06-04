import { join } from 'path';
import supertest from 'supertest';
import { createTest } from '../../index';

describe('createRoute', () => {
  describe('body', () => {
    describe('with buffer', () => {
      it('returns the body', async () => {
        const cwd = jest.spyOn(process, 'cwd');
        cwd.mockReturnValue(join(__dirname, './seeds/with-buffer'));

        const { server } = createTest();

        const post = await supertest(server).post('/').send('testing');
        expect(post.status).toStrictEqual(200);
        expect(post.body).toMatchObject({ body: 'testing' });

        cwd.mockRestore();
      });
    });

    describe('with json', () => {
      it('returns the body', async () => {
        const cwd = jest.spyOn(process, 'cwd');
        cwd.mockReturnValue(join(__dirname, './seeds/with-json'));

        const { server } = createTest();

        const post = await supertest(server).post('/').send({ body: 'testing' });
        expect(post.status).toStrictEqual(200);
        expect(post.body).toMatchObject({ body: 'testing' });

        cwd.mockRestore();
      });
    });

    describe('with text', () => {
      it('returns the body', async () => {
        const cwd = jest.spyOn(process, 'cwd');
        cwd.mockReturnValue(join(__dirname, './seeds/with-text'));

        const { server } = createTest();

        const post = await supertest(server).post('/').send('testing');
        expect(post.status).toStrictEqual(200);
        expect(post.body).toMatchObject({ body: 'testing' });

        cwd.mockRestore();
      });
    });
  });
});
