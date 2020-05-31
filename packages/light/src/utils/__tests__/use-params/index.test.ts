import useParams from '../../use-params';

describe('params', () => {
  describe('parsing', () => {
    it('should work', () => {
      const path = '/users/:id';
      const url = '/users/light';
      const obj = useParams(url)(path);
      expect(obj).toMatchObject({ id: 'light' });
    });

    it('should work without leading slash', () => {
      const path = 'users/:id';
      const url = 'users/light';
      const obj = useParams(url)(path);
      expect(obj).toMatchObject({ id: 'light' });
    });

    it('should work with multiple params', () => {
      const path = '/users/:id/:password';
      const url = '/users/light/hello';
      const obj = useParams(url)(path);
      expect(obj).toMatchObject({ id: 'light', password: 'hello' });
    });

    it('should work with multiple params with the same name', () => {
      const path = '/users/:id/:id';
      const url = '/users/light/server';
      const obj = useParams(url)(path);
      // will resolve the right most value
      expect(obj).toMatchObject({ id: 'server' });
    });
  });
});
