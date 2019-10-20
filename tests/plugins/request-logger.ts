import fetch from 'node-fetch';

import { test, route } from '../../src/index';

let server: any;

beforeEach(async () => {
  const { handler } = route();
  server = await test(handler(() => ({
    hello: 'world',
  })), {
    dev: false,
    requestLogger: true,
  });
});

afterEach(async () => {
  server.close();
});

describe('plugins', () => {
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
        const log = JSON.parse(spy.mock.calls[0][0]);
        expect(log.req).toHaveProperty('method', 'GET');
        expect(log.req).toHaveProperty('url', '/');
        expect(log.res).toHaveProperty('statusCode', 200);
        spy.mockRestore();
      });
    });
  });
});
