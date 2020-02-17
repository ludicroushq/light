import useModel from '../use-model';

describe('model', () => {
  describe('with name', () => {
    const { setHandler } = useModel('Test');
    const test = setHandler(() => ({ hello: 'world' }));

    it('exports model', async () => {
      expect.assertions(1);
      expect(test.model).toMatchObject({ hello: 'world' });
    });

    it('exports named model', async () => {
      expect.assertions(1);
      expect(test.Test).toMatchObject({ hello: 'world' });
    });

    it('has a name', async () => {
      expect.assertions(1);
      expect(test._name).toBe('Test');
    });
  });

  describe('without name', () => {
    it('throws an error', async () => {
      expect.assertions(1);
      expect(() => useModel('')).toThrow('model must have a unique name');
    });
  });
});
