import fetch from 'node-fetch';

import { createTest, createRoute } from '../index';

let plug: any = () => {};
let server: any;
let url: string;

beforeEach(async () => {
  const { withHandler, addPlugin } = createRoute('test');
  addPlugin(plug);
  server = createTest(withHandler((req: any) => ({
    hello: req.message,
  })));
  url = await server.listen();
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
    const req = await fetch(url);
    const res = await req.json();
    expect(req.status).toStrictEqual(200);
    expect(res).toMatchObject({ hello: 'plugin!!!' });
  });
});
