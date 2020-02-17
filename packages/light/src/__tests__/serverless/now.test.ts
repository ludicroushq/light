import { useRoute } from '../../index';

describe('serverless', () => {
  describe('now', () => {
    process.env.LIGHT_ENV = 'now';

    const { withHandler } = useRoute('now');
    const server: any = withHandler(() => ({
      hello: 'world',
    }));

    it('exports a function', async () => {
      expect.assertions(2);
      expect(server).toBeTruthy();
      expect(typeof server).toBe('function');
    });
  });
});
