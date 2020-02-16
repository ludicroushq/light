import fetch from 'node-fetch';
import listen from 'test-listen';
import { join } from 'path';

import {
  server,
} from '../src/index';

describe('global', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('with no light config', () => {
    it('does not find a config', async () => {
      expect.assertions(2);
      const spy = jest.spyOn(process, 'cwd');
      spy.mockReturnValue('/');

      const app = server({
        routes: join(__dirname, './seeds/global/with/routes'),
        opts: { requestLogger: false },
      });
      const url = await listen(app.server);

      const req = await fetch(url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: {} });
      spy.mockRestore();

      app.server.close();
    });
  });

  describe('with light config', () => {
    it('returns the config', async () => {
      expect.assertions(2);
      const spy = jest.spyOn(process, 'cwd');
      spy.mockReturnValue(join(__dirname, './seeds/global/with'));

      const app = server({
        routes: join(__dirname, './seeds/global/with/routes'),
        opts: { requestLogger: false },
      });
      const url = await listen(app.server);

      const req = await fetch(url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: { hello: 'world' } });
      spy.mockRestore();

      app.server.close();
    });

    it('finds and returns the config', async () => {
      expect.assertions(2);
      const spy = jest.spyOn(process, 'cwd');
      spy.mockReturnValue(join(__dirname, './seeds/global/with/routes'));

      const app = server({
        routes: join(__dirname, './seeds/global/with/routes'),
        opts: { requestLogger: false },
      });
      const url = await listen(app.server);

      const req = await fetch(url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: { hello: 'world' } });
      spy.mockRestore();

      app.server.close();
    });
  });

  describe('without global property', () => {
    it('returns an empty object', async () => {
      expect.assertions(2);
      const spy = jest.spyOn(process, 'cwd');
      spy.mockReturnValue(join(__dirname, './seeds/global/without'));

      const app = server({
        routes: join(__dirname, './seeds/global/without/routes'),
        opts: { requestLogger: false },
      });
      const url = await listen(app.server);

      const req = await fetch(url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: {} });
      spy.mockRestore();

      app.server.close();
    });
  });
});
