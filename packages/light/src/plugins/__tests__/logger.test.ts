import request from 'supertest';

import { join } from 'path';
import { createTest } from '../../index';

describe('plugins', () => {
  describe('youch', () => {
    it('youches the error', async () => {
      const cwd = jest.spyOn(process, 'cwd');
      cwd.mockReturnValue(join(__dirname, './seeds/logger'));
      const spy = jest.spyOn(console, 'info').mockImplementation();

      const { server } = createTest({ youch: false, requestLogger: true });

      const response = await request(server).get('/');
      expect(response.status).toStrictEqual(200);
      expect(response.body).toMatchObject({
        hello: 'world',
      });
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy.mock.calls[0][0]).toContain('GET');
      expect(spy.mock.calls[0][0]).toContain('/');
      expect(spy.mock.calls[1][0]).toContain('200');

      spy.mockRestore();
      cwd.mockRestore();
    });
  });
});
