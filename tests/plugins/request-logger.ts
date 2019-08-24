import fetch from 'node-fetch';

import { test, light, Route } from '../../src/index';

let server: any;
let disableRequestLogger: boolean = false;

beforeEach(async () => {
  server = await test(light(class index extends Route {
    async handler() {
      return {
        hello: 'world',
      };
    }
  }), { disableRequestLogger });
});

afterEach(async () => {
  server.close();
});

describe('request logger', () => {
  describe('with logger enabled', () => {
    it('logs', async () => {
      expect.assertions(6);
      const spy = jest.spyOn(process.stdout, 'write').mockImplementation();
      const req = await fetch(server.url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'world' });
      expect(spy).toHaveBeenCalledTimes(1);
      const log = JSON.parse(spy.mock.calls[0][0])
      expect(log.req).toHaveProperty('method', 'GET');
      expect(log.req).toHaveProperty('url', '/');
      expect(log.res).toHaveProperty('statusCode', 200);
      spy.mockRestore();
    });
  });
});
