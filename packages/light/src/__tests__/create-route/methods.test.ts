import { join } from 'path';
import supertest from 'supertest';
import { createTest } from '../../index';

describe('createRoute', () => {
  describe('methods', () => {
    describe('get', () => {
      it('returns for only get', async () => {
        const cwd = jest.spyOn(process, 'cwd');
        cwd.mockReturnValue(join(__dirname, './seeds/with-get'));

        const { server } = createTest();

        const get = await supertest(server).get('/');
        expect(get.status).toStrictEqual(200);
        expect(get.text).toBe('get works!');
        const post = await supertest(server).post('/');
        expect(post.status).toStrictEqual(405);
        expect(post.text).toBe('Method Not Allowed');

        cwd.mockRestore();
      });
    });

    describe('post', () => {
      it('returns for only post', async () => {
        const cwd = jest.spyOn(process, 'cwd');
        cwd.mockReturnValue(join(__dirname, './seeds/with-post'));

        const { server } = createTest();

        const post = await supertest(server).post('/');
        expect(post.status).toStrictEqual(200);
        expect(post.text).toBe('post works!');
        const get = await supertest(server).get('/');
        expect(get.status).toStrictEqual(405);
        expect(get.text).toBe('Method Not Allowed');

        cwd.mockRestore();
      });
    });

    describe('all', () => {
      it('returns for all methods', async () => {
        const cwd = jest.spyOn(process, 'cwd');
        cwd.mockReturnValue(join(__dirname, './seeds/with-all'));

        const { server } = createTest();

        const get = await supertest(server).get('/');
        expect(get.status).toStrictEqual(200);
        expect(get.text).toBe('all works!');
        const post = await supertest(server).post('/');
        expect(post.status).toStrictEqual(200);
        expect(post.text).toBe('all works!');

        cwd.mockRestore();
      });
    });
  });
});
