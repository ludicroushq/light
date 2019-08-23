import fetch from 'node-fetch';

import { test, light, Route } from '../src/index';

let plugin: any = () => {};
let server: any;

beforeEach(async () => {
  server = await test(light(class index extends Route {
    plugins = [plugin];

    async handler() {
      return {
        hello: (this.req as any).message,
      };
    }
  }));
});

afterEach(async () => {
  server.close();
});

describe('plugins', () => {
  beforeAll(() => {
    plugin = (fn: any): any => async (req: any, res: any): Promise<any> => {
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
