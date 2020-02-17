import fetch from 'node-fetch';

import { useTest, useRoute } from '../index';

let plug: any = () => {};
let server: any;
let url: string;

beforeEach(async () => {
  const { withHandler, addPlugin } = useRoute('test');
  addPlugin(plug);
  server = useTest(withHandler((req: any) => ({
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
