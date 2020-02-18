import createFactory from '../create-factory';

describe('factory', () => {
  describe('with name', () => {
    const { withHandler } = createFactory('Test');
    const test = withHandler(() => ({ hello: 'world' }));

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
      expect(() => createFactory('')).toThrow('factory must have a unique name');
    });
  });
});
