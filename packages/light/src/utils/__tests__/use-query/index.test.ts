import useQuery from '../../use-query';

describe('query', () => {
  describe('with route\'s static method', () => {
    it('works', () => {
      const url = '/test?hello=world';
      const { hello } = useQuery(url)();
      expect(hello).toStrictEqual('world');
    });

    it('works with an empty url', () => {
      const url = '';
      const res = useQuery(url)();
      expect(res).toMatchObject({});
    });

    it('works with multiple params', () => {
      const url = '/test?hello=world&foo=bar';
      const { hello, foo } = useQuery(url)();
      expect(hello).toStrictEqual('world');
      expect(foo).toStrictEqual('bar');
    });

    it('works with multiple params with the same name', () => {
      const url = '/test?hello=world&foo=bar&hello=test';
      const { hello, foo } = useQuery(url)();
      expect(hello).toEqual(['world', 'test']);
      expect(foo).toStrictEqual('bar');
    });
  });
});
