import { resolve } from 'url';
import fetch from 'node-fetch'

import { test } from '../src/index';

describe('methods', () => {
  it('should work with POST', async () => {
    const server = await test({
      path: '/method',
    
      method: 'POST',
    
      handler(req: any) {
        return {
          hello: req.method,
        };
      },
    });
    expect.assertions(2);
    const req = await fetch(resolve(server.url, '/method'), { method: 'POST' });
    const res = await req.json();
    expect(req.status).toStrictEqual(200);
    expect(res).toMatchObject({ hello: 'POST' });
    server.close();
  });

  it('should work with GET and POST', async () => {
    const server = await test({
      path: '/methods',
    
      method: ['GET', 'POST'],
    
      handler(req: any) {
        return {
          hello: req.method,
        };
      },
    })
    expect.assertions(4);
    const req = await fetch(resolve(server.url, '/methods'));
    const res = await req.json();
    const reqPost = await fetch(resolve(server.url, '/methods'), { method: 'POST' });
    const resPost = await reqPost.json();
    expect(req.status).toStrictEqual(200);
    expect(res).toMatchObject({ hello: 'GET' });
    expect(reqPost.status).toStrictEqual(200);
    expect(resPost).toMatchObject({ hello: 'POST' });
    server.close();
  });
});
