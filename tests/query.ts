import fetch from 'node-fetch';
import join from 'url-join';

import { Route, light, test } from '../src/index';

describe('query', () => {
  describe('with route\'s static method', () => {
    it('should work', async () => {
      expect.assertions(1);
      const url = '/test?hello=world';
      const { hello } = await Route.query(url);
      expect(hello).toStrictEqual('world');
    });

    it('should work with an empty url', async () => {
      expect.assertions(1);
      const url = '';
      const res = await Route.query(url);
      expect(res).toMatchObject({});
    });

    it('should work with multiple params', async () => {
      expect.assertions(2);
      const url = '/test?hello=world&foo=bar';
      const { hello, foo } = await Route.query(url);
      expect(hello).toStrictEqual('world');
      expect(foo).toStrictEqual('bar');
    });

    it('should work with multiple params with the same name', async () => {
      expect.assertions(2);
      const url = '/test?hello=world&foo=bar&hello=test';
      const { hello, foo } = await Route.query(url);
      expect(hello).toEqual(['world', 'test']);
      expect(foo).toStrictEqual('bar');
    });
  });

  describe('with Route instance', () => {
    const handler: any = class Index extends Route {
      public async handler() {
        return this.query();
      }
    };
    let server: any;

    beforeEach(async () => {
      server = await test(light(handler));
    });

    afterEach(async () => {
      server.close();
    });

    it('should work', async () => {
      expect.assertions(2);
      const url = join(server.url, '?hello=world');
      const req = await fetch(url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'world' });
    });

    it('should work with an empty url', async () => {
      expect.assertions(2);
      const url = server.url;
      const req = await fetch(url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({});
    });

    it('should work with multiple params', async () => {
      expect.assertions(2);
      const url = join(server.url, '?hello=world&foo=bar');
      const req = await fetch(url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({
        hello: 'world',
        foo: 'bar',
      });
    });

    it('should work with multiple params with the same name', async () => {
      expect.assertions(2);
      const url = join(server.url, '?hello=world&foo=bar&hello=test');
      const req = await fetch(url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({
        hello: ['world', 'test'],
        foo: 'bar',
      });
    });
  });
});
