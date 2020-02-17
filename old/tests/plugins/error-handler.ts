import fetch from 'node-fetch';

import {
  test, route, createError,
} from '../../src/index';

let server: any;
let errorHandler = true;
let error: any = () => {};
let url: string;

beforeEach(async () => {
  const { handler } = route();
  server = test(handler(() => error()), { errorHandler });
  url = await server.listen();
});

afterEach(async () => {
  server.close();
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
        const req = await fetch(url);
        const res = await req.json();
        expect(req.status).toStrictEqual(500);
        expect(res).toMatchObject({
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
        const req = await fetch(url);
        const res = await req.json();
        expect(req.status).toStrictEqual(400);
        expect(res).toMatchObject({
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
        const req = await fetch(url);
        const res = await req.text();
        expect(req.status).toStrictEqual(500);
        expect(res).toBe('Internal Server Error');
        spy.mockRestore();
      });
    });
  });
});
