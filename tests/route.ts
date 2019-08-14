import { resolve } from 'url';
import fetch from 'node-fetch';
import { test } from '../src/index';

let server: any;
let path: string = '/';
let response: string = 'world';
beforeEach(async () => {
  server = await test({
    path,
  
    handler() {
      return {
        hello: response,
      };
    },
  });
});

afterEach(() => server.close());

describe('routes', () => {
  describe('route', () => {
    beforeAll(() => {
      path = '/route';
      response = 'route world';
    });

    it('should work', async () => {
      expect.assertions(2);
      const req = await fetch(resolve(server.url, '/route'));
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'route world' });
    });

    describe('another endpoint', () => {
      beforeAll(() => {
        path = '/runkit';
        response = 'runkit world';
      });

      it('should work again', async () => {
        expect.assertions(2);
        const req = await fetch(resolve(server.url, '/runkit'));
        const res = await req.json();
        expect(req.status).toStrictEqual(200);
        expect(res).toMatchObject({ hello: 'runkit world' });
      });
    });

    // it('should work with default export', async () => {
    //   expect.assertions(2);
    //   const req = await fetch(resolve(server.url, '/route-default'));
    //   const res = await req.json();
    //   expect(req.status).toStrictEqual(200);
    //   expect(res).toMatchObject({ hello: 'default route world' });
    // });

    // it('should work with missing path', async () => {
    //   expect.assertions(2);
    //   const req = await fetch(resolve(url, '/api/v1/route-missing-path'));
    //   const res = await req.json();
    //   expect(req.status).toStrictEqual(200);
    //   expect(res).toMatchObject({ hello: 'nested route world missing url' });
    // });

    // it('should work with a custom path', async () => {
    //   expect.assertions(2);
    //   const req = await fetch(resolve(url, '/api/v1/extra/route'));
    //   const res = await req.json();
    //   expect(req.status).toStrictEqual(200);
    //   expect(res).toMatchObject({ hello: 'nested route world' });
    // });
  });
});
