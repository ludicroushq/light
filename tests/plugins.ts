import fetch from 'node-fetch';

import { test, route } from '../src/index';

let plug: any = () => {};
let server: any;

beforeEach(async () => {
  const { handler, plugins } = route();
  plugins(plug);
  server = await test(handler((req: any) => ({
    hello: req.message,
  })));
});

afterEach(async () => {
  server.close();
});

describe('plugins', () => {
  beforeAll(() => {
    plug = (fn: any): any => async (req: any, res: any): Promise<any> => {
      req.message = 'plugin!!!';
      return fn(req, res);
    };
  });

  it('returns data from a plugin', async () => {
    expect.assertions(2);
    const req = await fetch(server.url);
    const res = await req.json();
    expect(req.status).toStrictEqual(200);
    expect(res).toMatchObject({ hello: 'plugin!!!' });
  });
});
