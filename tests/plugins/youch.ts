import fetch from 'node-fetch';

import { test, route } from '../../src/index';

let server: any;

beforeEach(async () => {
  const { handler } = route();
  server = await test(handler(() => {
    throw new Error('hi');
  }), {
    dev: true,
  });
});

afterEach(async () => {
  server.close();
});

describe('plugins', () => {
  describe('youch', () => {
    describe('in dev mode', () => {
      it('youches the error', async () => {
        expect.assertions(3);
        const spy = jest.spyOn(console, 'log').mockImplementation();
        const req = await fetch(server.url);
        const res = await req.text();
        expect(req.status).toStrictEqual(200);
        expect(res).toContain('html');
        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockRestore();
      });
    });
  });
});
