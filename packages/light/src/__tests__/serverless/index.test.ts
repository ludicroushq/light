describe('createRoute', () => {
  describe('serverless', () => {
    describe('with runkit', () => {
      it('returns the correct handler', async () => {
        process.env.LIGHT_ENV = 'runkit';
        jest.resetModules();
        // eslint-disable-next-line global-require
        const route = require('./seeds/with-endpoint/routes/index');
        expect(route.default.endpoint).toBeTruthy();
        process.env.LIGHT_ENV = undefined;
      });
    });

    describe('with netlify', () => {
      it('returns the correct handler', async () => {
        process.env.LIGHT_ENV = 'netlify';
        jest.resetModules();
        // eslint-disable-next-line global-require
        const route = require('./seeds/with-endpoint/routes/index');
        expect(route.default.handler).toBeTruthy();
        process.env.LIGHT_ENV = undefined;
      });
    });

    describe('with aws', () => {
      it('returns the correct handler', async () => {
        process.env.LIGHT_ENV = 'aws';
        jest.resetModules();
        // eslint-disable-next-line global-require
        const route = require('./seeds/with-endpoint/routes/index');
        expect(route.default.handler).toBeTruthy();
        process.env.LIGHT_ENV = undefined;
      });
    });

    describe('with now', () => {
      it('returns the correct handler', async () => {
        process.env.LIGHT_ENV = 'now';
        jest.resetModules();
        // eslint-disable-next-line global-require
        const route = require('./seeds/with-endpoint/routes/index');
        expect(typeof route.default).toBe('function');
        process.env.LIGHT_ENV = undefined;
      });
    });
  });
});
