import { IncomingMessage } from 'http';
import query from '../src/query';

describe('query', () => {
  describe('params', () => {
    it('should work', async () => {
      expect.assertions(1);
      const req = {
        url: '/test?hello=world',
      };
      const { hello } = await query((req as IncomingMessage));
      expect(hello).toStrictEqual('world');
    });

    it('should work without req.url', async () => {
      expect.assertions(1);
      const req = {
      };
      const res = await query((req as IncomingMessage));
      expect(res).toMatchObject({});
    });

    it('should work with multiple params', async () => {
      expect.assertions(2);
      const req = {
        url: '/test?hello=world&foo=bar',
      };
      const { hello, foo } = await query((req as IncomingMessage));
      expect(hello).toStrictEqual('world');
      expect(foo).toStrictEqual('bar');
    });

    it('should work with multiple params with the same name', async () => {
      expect.assertions(2);
      const req = {
        url: '/test?hello=world&foo=bar&hello=test',
      };
      const { hello, foo } = await query((req as IncomingMessage));
      expect(hello).toEqual(['world', 'test']);
      expect(foo).toStrictEqual('bar');
    });
  });
});
