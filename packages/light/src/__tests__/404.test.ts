import fetch from 'node-fetch';
import join from 'url-join';

import {
  createTest, createRoute,
} from '../index';

const { withHandler } = createRoute('test');
const { listen, close } = createTest(withHandler(() => ({
  hello: 'world',
})));

let url: any;
beforeEach(async () => {
  url = await listen();
});

afterEach(async () => {
  close();
});

describe('404', () => {
  describe('with correct route', () => {
    it('returns data', async () => {
      expect.assertions(2);
      const req = await fetch(url);
      const res = await req.json();
      expect(req.status).toStrictEqual(200);
      expect(res).toMatchObject({ hello: 'world' });
    });
  });

  describe('with incorrect route', () => {
    it('returns a 404 error', async () => {
      expect.assertions(2);
      const req = await fetch(join(url, 'hello'));
      const res = await req.text();
      expect(req.status).toStrictEqual(404);
      expect(res).toBe('Not Found');
    });
  });
});
