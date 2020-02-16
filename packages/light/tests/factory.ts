import factory from '../src/factory';

describe('factory', () => {
  describe('with name', () => {
    const { handler } = factory('Test');
    const test = handler(() => ({ hello: 'world' }));

    it('exports factory', async () => {
      expect.assertions(1);
      expect(test.hello).toBe('world');
    });

    it('exports named factory', async () => {
      expect.assertions(1);
      expect(test.helloTest).toBe('world');
    });

    it('has a name', async () => {
      expect.assertions(1);
      expect(test._name).toBe('Test');
    });
  });

  describe('without name', () => {
    it('throws an error', async () => {
      expect.assertions(1);
      expect(() => factory('')).toThrow('factory must have a name');
    });
  });
});
