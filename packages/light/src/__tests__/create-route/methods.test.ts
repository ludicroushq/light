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
        expect(get.text).toBe('GET works!');
        const post = await supertest(server).post('/');
        expect(post.status).toStrictEqual(404);
        expect(post.text).toBe('Not Found');

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
        expect(post.text).toBe('POST works!');
        const get = await supertest(server).get('/');
        expect(get.status).toStrictEqual(404);
        expect(get.text).toBe('Not Found');

        cwd.mockRestore();
      });
    });
  });
});
