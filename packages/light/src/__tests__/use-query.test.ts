import { useQuery } from '../index';

describe('query', () => {
  describe('with route\'s static method', () => {
    it('works', async () => {
      expect.assertions(1);
      const url = '/test?hello=world';
      const { hello } = await useQuery(url);
      expect(hello).toStrictEqual('world');
    });

    it('works with an empty url', async () => {
      expect.assertions(1);
      const url = '';
      const res = await useQuery(url);
      expect(res).toMatchObject({});
    });

    it('works with multiple params', async () => {
      expect.assertions(2);
      const url = '/test?hello=world&foo=bar';
      const { hello, foo } = await useQuery(url);
      expect(hello).toStrictEqual('world');
      expect(foo).toStrictEqual('bar');
    });

    it('works with multiple params with the same name', async () => {
      expect.assertions(2);
      const url = '/test?hello=world&foo=bar&hello=test';
      const { hello, foo } = await useQuery(url);
      expect(hello).toEqual(['world', 'test']);
      expect(foo).toStrictEqual('bar');
    });
  });
});
