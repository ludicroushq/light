import { join } from 'path';
import listen from 'test-listen';
import { resolve } from 'url';
import fetch from 'node-fetch';
import { server } from '../src/index';

const app = server({
  routes: [
    join(__dirname, 'seeds/routes/middleware.ts'),
    join(__dirname, 'seeds/routes/middleware-return.ts'),
  ],
  log: false,
});
let url: string;

beforeAll(async () => {
  url = await listen(app.server);
});

afterAll(() => app.server.close());

describe('middleware', () => {
  it('should work', async () => {
    expect.assertions(2);
    global.console.log = jest.fn();
    const req = await fetch(resolve(url, '/middleware'));
    const res = await req.json();
    expect(req.status).toStrictEqual(200);
    expect(res).toMatchObject({ hello: 'world' });
  });

  it('should work with early return', async () => {
    expect.assertions(2);
    global.console.log = jest.fn();
    const req = await fetch(resolve(url, '/middleware-return'));
    const res = await req.json();
    expect(req.status).toStrictEqual(200);
    expect(res).toMatchObject({ hello: 'middleware' });
  });
});
