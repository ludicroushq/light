import params from '../params';

describe('params', () => {
  describe('parsing', () => {
    it('should work', async () => {
      expect.assertions(1);
      const path = '/users/:id';
      const url = '/users/light';
      const obj = await params(path, url);
      expect(obj).toMatchObject({ id: 'light' });
    });

    it('should work without leading slash', async () => {
      expect.assertions(1);
      const path = 'users/:id';
      const url = 'users/light';
      const obj = await params(path, url);
      expect(obj).toMatchObject({ id: 'light' });
    });

    it('should work with multiple params', async () => {
      expect.assertions(1);
      const path = '/users/:id/:password';
      const url = '/users/light/hello';
      const obj = await params(path, url);
      expect(obj).toMatchObject({ id: 'light', password: 'hello' });
    });

    it('should work with multiple params with the same name', async () => {
      expect.assertions(1);
      const path = '/users/:id/:id';
      const url = '/users/light/server';
      const obj = await params(path, url);
      // will resolve the right most value
      expect(obj).toMatchObject({ id: 'server' });
    });
  });
});
