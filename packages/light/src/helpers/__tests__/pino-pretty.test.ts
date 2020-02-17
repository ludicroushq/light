import stripAnsi from 'strip-ansi';
import pinoPretty from '../pino-pretty';

const logger = pinoPretty();

let input = {};
let result = '';

beforeEach(() => {
  result = stripAnsi(logger(input)).trim();
});

describe('pino pretty', () => {
  describe('without msg', () => {
    describe('with req', () => {
      beforeAll(() => {
        input = { v: 1, level: '30', req: {} };
      });
      it('returns nothing (this should never happen)', () => {
        expect.assertions(1);
        expect(result).toBe('');
      });
    });

    describe('without req', () => {
      beforeAll(() => {
        input = { v: 1, level: '30' };
      });
      it('returns info message', () => {
        expect.assertions(1);
        expect(result).toBe('info');
      });
    });
  });

  describe('without req and res objects', () => {
    describe('levels', () => {
      describe('with level 10', () => {
        beforeAll(() => {
          input = { v: 1, level: '10', msg: 'light' };
        });
        it('returns trace message', () => {
          expect.assertions(1);
          expect(result).toBe('trace light');
        });
      });
      describe('with level 20', () => {
        beforeAll(() => {
          input = { v: 1, level: '20', msg: 'light' };
        });
        it('returns debug message', () => {
          expect.assertions(1);
          expect(result).toBe('debug light');
        });
      });
      describe('with level 30', () => {
        beforeAll(() => {
          input = { v: 1, level: '30', msg: 'light' };
        });
        it('returns info message', () => {
          expect.assertions(1);
          expect(result).toBe('info light');
        });
      });
      describe('with level 40', () => {
        beforeAll(() => {
          input = { v: 1, level: '40', msg: 'light' };
        });
        it('returns warn message', () => {
          expect.assertions(1);
          expect(result).toBe('warn light');
        });
      });
      describe('with level 50', () => {
        beforeAll(() => {
          input = { v: 1, level: '50', msg: 'light' };
        });
        it('returns error message', () => {
          expect.assertions(1);
          expect(result).toBe('error light');
        });
      });
      describe('with level 60', () => {
        beforeAll(() => {
          input = { v: 1, level: '60', msg: 'light' };
        });
        it('returns fatal message', () => {
          expect.assertions(1);
          expect(result).toBe('fatal light');
        });
      });
      describe('with no level', () => {
        beforeAll(() => {
          input = { v: 1, msg: 'light' };
        });
        it('returns a regular message', () => {
          expect.assertions(1);
          expect(result).toBe('light');
        });
      });
    });
  });

  describe('with req and res objects', () => {
    describe('methods', () => {
      describe('with GET method', () => {
        beforeAll(() => {
          input = { v: 1, req: { method: 'GET' }, msg: 'light' };
        });
        it('returns GET message', () => {
          expect.assertions(1);
          expect(result).toBe('GET  light');
        });
      });
      describe('with POST method', () => {
        beforeAll(() => {
          input = { v: 1, req: { method: 'POST' }, msg: 'light' };
        });
        it('returns POST message', () => {
          expect.assertions(1);
          expect(result).toBe('POST  light');
        });
      });
      describe('with PUT method', () => {
        beforeAll(() => {
          input = { v: 1, req: { method: 'PUT' }, msg: 'light' };
        });
        it('returns PUT message', () => {
          expect.assertions(1);
          expect(result).toBe('PUT  light');
        });
      });
      describe('with PATCH method', () => {
        beforeAll(() => {
          input = { v: 1, req: { method: 'PATCH' }, msg: 'light' };
        });
        it('returns GET message', () => {
          expect.assertions(1);
          expect(result).toBe('PATCH  light');
        });
      });
      describe('with DELETE method', () => {
        beforeAll(() => {
          input = { v: 1, req: { method: 'DELETE' }, msg: 'light' };
        });
        it('returns DELETE message', () => {
          expect.assertions(1);
          expect(result).toBe('DELETE  light');
        });
      });
      describe('with a random method', () => {
        beforeAll(() => {
          input = { v: 1, req: { method: 'something else' }, msg: 'light' };
        });
        it('returns structured message', () => {
          expect.assertions(1);
          expect(result).toBe('something else  light');
        });
      });
    });
    describe('status codes', () => {
      describe('with 200 status code', () => {
        beforeAll(() => {
          input = {
            v: 1, req: {}, res: { statusCode: 200 }, msg: 'light',
          };
        });
        it('returns a 200 message', () => {
          expect.assertions(1);
          expect(result).toBe('200 light');
        });
      });
      describe('with 300 status code', () => {
        beforeAll(() => {
          input = {
            v: 1, req: {}, res: { statusCode: 300 }, msg: 'light',
          };
        });
        it('returns a 300 message', () => {
          expect.assertions(1);
          expect(result).toBe('300 light');
        });
      });
      describe('with 404 status code', () => {
        beforeAll(() => {
          input = {
            v: 1, req: {}, res: { statusCode: 404 }, msg: 'light',
          };
        });
        it('returns a 404 message', () => {
          expect.assertions(1);
          expect(result).toBe('404 light');
        });
      });
      describe('with 500 status code', () => {
        beforeAll(() => {
          input = {
            v: 1, req: {}, res: { statusCode: 500 }, msg: 'light',
          };
        });
        it('returns a 500 message', () => {
          expect.assertions(1);
          expect(result).toBe('500 light');
        });
      });
    });
    describe('url', () => {
      describe('with a url', () => {
        beforeAll(() => {
          input = {
            v: 1, req: { method: 'GET', url: '/hello-world?test=true' }, res: { statusCode: 200 }, msg: 'light',
          };
        });
        it('returns a 200 message', () => {
          expect.assertions(1);
          expect(result).toBe('GET  200 to /hello-world?test=true, light');
        });
      });
    });
    describe('response time', () => {
      describe('with a response time', () => {
        beforeAll(() => {
          input = {
            v: 1, req: { method: 'GET', url: '/hello-world?test=true' }, res: { statusCode: 200 }, msg: 'light', responseTime: 1,
          };
        });
        it('returns a 200 message', () => {
          expect.assertions(1);
          expect(result).toBe('GET  200 to /hello-world?test=true, light in 1 ms');
        });
      });
    });
  });

  describe('with string input', () => {
    beforeAll(() => {
      input = JSON.stringify({
        v: 1, req: { method: 'GET', url: '/hello-world?test=true' }, res: {}, msg: 'light', responseTime: 1,
      });
    });
    it('returns a GET message', () => {
      expect.assertions(1);
      expect(result).toBe('GET  to /hello-world?test=true, light in 1 ms');
    });
  });
});
