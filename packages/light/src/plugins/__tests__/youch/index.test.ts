import request from 'supertest';

import { join } from 'path';
import logger from '../../../logger';
import { createTest } from '../../../index';

describe('plugins', () => {
  describe('youch', () => {
    it('youches the error', async () => {
      const cwd = jest.spyOn(process, 'cwd');
      cwd.mockReturnValue(join(__dirname, './seeds/youch'));
      const spy = jest.spyOn(logger, 'info').mockImplementation();

      const { server } = createTest({ youch: true });

      const response = await request(server).get('/');
      expect(response.status).toStrictEqual(200);
      expect(response.text).toContain('html');
      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockRestore();
      cwd.mockRestore();
    });
  });
});
