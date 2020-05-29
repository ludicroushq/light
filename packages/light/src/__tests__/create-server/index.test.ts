import { join } from 'path';
import supertest from 'supertest';
import { createServer, logger } from '../../index';

describe('createServer', () => {
  describe('with youch', () => {
    it('youches the error', async () => {
      const cwd = jest.spyOn(process, 'cwd');
      cwd.mockReturnValue(join(__dirname, './seeds/with-youch'));
      const spy = jest.spyOn(logger, 'info').mockImplementation();

      const { server } = createServer({ youch: true, requestLogger: false });

      const response = await supertest(server).get('/');
      expect(response.status).toStrictEqual(200);
      expect(response.text).toContain('html');
      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockRestore();
      cwd.mockRestore();
    });
  });

  describe('with logger', () => {
    it('logs the error', async () => {
      const cwd = jest.spyOn(process, 'cwd');
      cwd.mockReturnValue(join(__dirname, './seeds/with-logger'));
      const spy = jest.spyOn(console, 'info').mockImplementation();

      const { server } = createServer({ youch: false, requestLogger: true });

      const response = await supertest(server).get('/');
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
