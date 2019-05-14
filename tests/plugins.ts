import { join } from 'path';
import listen from 'test-listen';
import { resolve } from 'url';
import fetch from 'node-fetch';
import { server } from '../src/index';

const app = server({
  routes: [
    join(__dirname, 'seeds/routes/plugins.ts'),
  ],
  log: false,
});
let url: string;

beforeAll(async () => {
  url = await listen(app.server);
});

afterAll(() => app.server.close());

describe('plugins', () => {
  it('should work', async () => {
    expect.assertions(2);
    global.console.log = jest.fn();
    const req = await fetch(resolve(url, '/plugin'));
    const res = await req.json();
    expect(req.status).toStrictEqual(200);
    expect(res).toMatchObject({ hello: 'plugin' });
  });
});
