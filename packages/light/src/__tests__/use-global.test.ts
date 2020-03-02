import { join } from 'path';

import {
  useGlobal,
} from '../index';

declare const light: any;

describe('useGlobal', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('with light config', () => {
    describe('with global property', () => {
      it('finds and returns the config', async () => {
        expect.assertions(1);
        const spy = jest.spyOn(process, 'cwd');
        spy.mockReturnValue(join(__dirname, './seeds/global/with/routes'));
        const result = useGlobal();
        expect(result).toMatchObject({ hello: 'world' });
        spy.mockRestore();
      });
    });
    describe('without global property', () => {
      it('finds and returns the config', async () => {
        expect.assertions(1);
        const spy = jest.spyOn(process, 'cwd');
        spy.mockReturnValue(join(__dirname, './seeds/global/without/routes'));
        const result = useGlobal();
        expect(result).toMatchObject({});
        spy.mockRestore();
      });
    });
  });

  describe('without light config', () => {
    it('returns an empty object', async () => {
      expect.assertions(1);
      const spy = jest.spyOn(process, 'cwd');
      spy.mockReturnValue('/');
      const result = useGlobal();
      expect(result).toMatchObject({});
      spy.mockRestore();
    });
  });

  // beforeEach(() => {
  //   jest.resetModules();
  // });

  // describe('with no light config', () => {
  //   it('does not find a config', async () => {
  //     expect.assertions(2);
  //     const spy = jest.spyOn(process, 'cwd');
  //     spy.mockReturnValue('/');

  //     const { route } = createRoute('test');
  //     const handler = route(() => ({
  //       hello: (global as any).light,
  //     }));

  //     const { server } = createServer({
  //       routes: [{
  //         path: '/',
  //         handler,
  //       }],
  //       opts: { requestLogger: false },
  //     });

  //     const response = await request(server).get('/');
  //     expect(response.status).toStrictEqual(200);
  //     expect(response.body).toMatchObject({ hello: {} });
  //     spy.mockRestore();
  //   });
  // });

  // describe('with light config', () => {
  //   it('returns the config', async () => {
  //     expect.assertions(2);
  //     const spy = jest.spyOn(process, 'cwd');
  //     spy.mockReturnValue(join(__dirname, './seeds/global/with'));

  //     const { route } = createRoute('test');
  //     const handler = route(() => ({
  //       hello: light,
  //     }));

  //     const app = createServer({
  //       routes: [{
  //         path: '/',
  //         handler,
  //       }],
  //       opts: { requestLogger: false },
  //     });
  //     const url = await listen(app.server);

  //     const req = await fetch(url);
  //     const res = await req.json();
  //     expect(req.status).toStrictEqual(200);
  //     expect(res).toMatchObject({ hello: { hello: 'world' } });
  //     spy.mockRestore();

  //     app.server.close();
  //   });

  // it('finds and returns the config', async () => {
  //   expect.assertions(2);
  //   const spy = jest.spyOn(process, 'cwd');
  //   spy.mockReturnValue(join(__dirname, './seeds/global/with/routes'));

  //   const { route } = createRoute('test');
  //   const handler = route(() => ({
  //     hello: light,
  //   }));

  //   const app = createServer({
  //     routes: [{
  //       path: '/',
  //       handler,
  //     }],
  //     opts: { requestLogger: false },
  //   });
  //   const url = await listen(app.server);

  //   const req = await fetch(url);
  //   const res = await req.json();
  //   expect(req.status).toStrictEqual(200);
  //   expect(res).toMatchObject({ hello: { hello: 'world' } });
  //   spy.mockRestore();

  //   app.server.close();
  // });
  // });

  // describe('without global property', () => {
  //   it('returns an empty object', async () => {
  //     expect.assertions(2);
  //     const spy = jest.spyOn(process, 'cwd');
  //     spy.mockReturnValue(join(__dirname, './seeds/global/without'));

  //     const { route } = createRoute('test');
  //     const handler = route(() => ({
  //       hello: light,
  //     }));

  //     const app = createServer({
  //       routes: [{
  //         path: '/',
  //         handler,
  //       }],
  //       opts: { requestLogger: false },
  //     });
  //     const url = await listen(app.server);

  //     const req = await fetch(url);
  //     const res = await req.json();
  //     expect(req.status).toStrictEqual(200);
  //     expect(res).toMatchObject({ hello: {} });
  //     spy.mockRestore();

  //     app.server.close();
  //   });
  // });
});
