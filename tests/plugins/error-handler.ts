import fetch from 'node-fetch';

import {
  test, light, Route, createError,
} from '../../src/index';

let server: any;
let disableErrorHandler = false;
let error: any = () => {};

beforeEach(async () => {
  server = await test(light(class Index extends Route {
    public async handler() {
      error();
    }
  }), { disableErrorHandler });
});

afterEach(async () => {
  server.close();
});

describe('error handler', () => {
  describe('with standard error', () => {
    beforeAll(() => {
      error = () => { throw new Error('message'); };
    });

    it('returns a 500 error', async () => {
      expect.assertions(2);
      const req = await fetch(server.url);
      const res = await req.json();
      expect(req.status).toStrictEqual(500);
      expect(res).toMatchObject({
        error: 'Internal Server Error',
        message: 'An internal server error occurred',
        statusCode: 500,
      });
    });
  });

  describe('with a custom error created with createError', () => {
    beforeAll(() => {
      error = () => { throw createError(400, 'custom error message'); };
    });

    it('returns a 500 error', async () => {
      expect.assertions(2);
      const req = await fetch(server.url);
      const res = await req.json();
      expect(req.status).toStrictEqual(400);
      expect(res).toMatchObject({
        error: 'Bad Request',
        message: 'custom error message',
        statusCode: 400,
      });
    });
  });

  describe('with error handler disabled', () => {
    beforeAll(() => {
      disableErrorHandler = true;
      error = () => { throw new Error('message'); };
    });

    it('returns an internal server error in text', async () => {
      expect.assertions(2);
      const spy = jest.spyOn(console, 'error').mockImplementation();
      const req = await fetch(server.url);
      const res = await req.text();
      expect(req.status).toStrictEqual(500);
      expect(res).toBe('Internal Server Error');
      spy.mockRestore();
    });
  });
});
