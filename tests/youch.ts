import { join } from 'path';
import listen from 'test-listen';
import { resolve } from 'url';
import fetch from 'node-fetch';
import { server } from '../src/index';

const app = server({
  routes: join(__dirname, 'seeds/youch.ts'),
  log: false,
});
let url: string;

beforeAll(async () => {
  url = await listen(app.server);
});

afterAll(() => app.server.close());

describe('youch', () => {
  it('should return an error', async () => {
    expect.assertions(2);
    global.console.log = jest.fn();
    const req = await fetch(resolve(url, '/youch'));
    const res = await req.json();
    expect(req.status).toStrictEqual(500);
    expect(res).toMatchObject({
      error: 'Internal Server Error',
      message: 'An internal server error occurred',
      statusCode: 500,
    });
  });
});
