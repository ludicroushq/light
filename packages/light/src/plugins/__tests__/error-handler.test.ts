import request from 'supertest';

import {
  createServer, createRoute, createError,
} from '../../index';

let server: any;
let errorHandler = true;
let error: any = () => {};

beforeEach(async () => {
  const { route } = createRoute('test');
  ({ server } = createServer({
    routes: [
      {
        handler: route(() => error()),
        path: '/',
      },
    ],
    opts: { requestLogger: false, errorHandler },
  }));
});

describe('plugins', () => {
  describe('error handler', () => {
    describe('with standard error', () => {
      beforeAll(() => {
        error = () => { throw new Error('message'); };
      });

      it('returns a 500 error', async () => {
        expect.assertions(3);
        const spy = jest.spyOn(process.stdout, 'write').mockImplementation();
        const response = await request(server).get('/');
        expect(response.status).toStrictEqual(500);
        expect(response.body).toMatchObject({
          error: 'Internal Server Error',
          message: 'An internal server error occurred',
          statusCode: 500,
        });
        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockRestore();
      });
    });

    describe('with a custom error created with createError', () => {
      beforeAll(() => {
        error = () => { throw createError(400, 'custom error message'); };
      });

      it('returns a 500 error', async () => {
        expect.assertions(3);
        const spy = jest.spyOn(process.stdout, 'write').mockImplementation();
        const response = await request(server).get('/');
        expect(response.status).toStrictEqual(400);
        expect(response.body).toMatchObject({
          error: 'Bad Request',
          message: 'custom error message',
          statusCode: 400,
        });
        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockRestore();
      });
    });

    describe('with error handler disabled', () => {
      beforeAll(() => {
        errorHandler = false;
        error = () => { throw new Error('message'); };
      });

      it('returns an internal server error in text', async () => {
        expect.assertions(2);
        const spy = jest.spyOn(console, 'error').mockImplementation();
        const response = await request(server).get('/');
        expect(response.status).toStrictEqual(500);
        expect(response.text).toBe('Internal Server Error');
        spy.mockRestore();
      });
    });
  });
});
