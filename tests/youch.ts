import { resolve } from 'url';
import fetch from 'node-fetch';
import { test } from '../src/index';

let server: any;
beforeEach(async () => {
  server = await test({
    path: '/youch',
    handler() {
      throw new Error('hello youch');
    },
  });
});

afterEach(async () => {
  server.close();
});

describe('youch', () => {
  it('returns an error', async () => {
    expect.assertions(2);
    const req = await fetch(resolve(server.url, '/youch'));
    const res = await req.json();
    expect(req.status).toStrictEqual(500);
    expect(res).toMatchObject({
      error: 'Internal Server Error',
      message: 'An internal server error occurred',
      statusCode: 500,
    });
  });
});
