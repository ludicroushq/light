import { resolve } from 'url';
import fetch from 'node-fetch';

import { test } from '../src/index';

let server: any;
const plugin = (fn: any): any => async (req: any, res: any): Promise<any> => {
  req.hello = 'plugin';
  return fn(req, res);
};

beforeEach(async () => {
  server = await test({
    path: '/plugin',

    plugins: [
      plugin,
    ],

    handler(req: any) {
      return {
        hello: req.hello,
      };
    },
  });
});

afterEach(async () => {
  server.close();
});

describe('plugins', () => {
  it('should work', async () => {
    expect.assertions(2);
    const req = await fetch(resolve(server.url, '/plugin'));
    const res = await req.json();
    expect(req.status).toStrictEqual(200);
    expect(res).toMatchObject({ hello: 'plugin' });
  });
});
