import request from 'supertest';

import { createServer, createRoute } from '../index';

let plug: any = () => {};
let server: any;

beforeEach(async () => {
  const { route, addPlugin } = createRoute('test');
  addPlugin(plug);
  ({ server } = createServer({
    routes: [
      {
        handler: route((req: any) => ({
          hello: req.message,
        })),
        path: '/',
      },
    ],
    opts: { requestLogger: false },
  }));
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
    const response = await request(server).get('/');
    expect(response.status).toStrictEqual(200);
    expect(response.body).toMatchObject({ hello: 'plugin!!!' });
  });
});
