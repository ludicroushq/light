import { join } from 'path';
import listen from 'test-listen';
import { resolve } from 'url';
import fetch from 'node-fetch';
import { server } from '../src/index';

const app = server({
  routes: [
    join(__dirname, 'seeds/routes/method.ts'),
    join(__dirname, 'seeds/routes/methods.ts'),
  ],
  log: false,
});
let url: string;

beforeAll(async () => {
  url = await listen(app.server);
});

afterAll(() => app.server.close());

describe('methods', () => {
  it('should work with POST', async () => {
    expect.assertions(2);
    const req = await fetch(resolve(url, '/method'), { method: 'POST' });
    const res = await req.json();
    expect(req.status).toStrictEqual(200);
    expect(res).toMatchObject({ hello: 'POST' });
  });

  it('should work with GET and POST', async () => {
    expect.assertions(4);
    const req = await fetch(resolve(url, '/methods'));
    const res = await req.json();
    const reqPost = await fetch(resolve(url, '/methods'), { method: 'POST' });
    const resPost = await reqPost.json();
    expect(req.status).toStrictEqual(200);
    expect(res).toMatchObject({ hello: 'GET' });
    expect(reqPost.status).toStrictEqual(200);
    expect(resPost).toMatchObject({ hello: 'POST' });
  });
});
