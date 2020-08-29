const { createRoute } = require('light');
const { route, GET } = createRoute();

// useMiddleware(() => console.log('hi'));
// usePlugin((fn) => async (req, res) => {
//   console.log('before');
//   const result = await fn(req, res);
//   console.log('after');
//   return result;
// });

GET(
  async () => {
    return {
      hello: 'worlds',
    };
  },
  {
    middleware: [
      (fn) => async (ctx) => {
        const before = Date.now();
        const result = await fn(ctx);
        const after = Date.now();
        console.log('request served in', after - before, 'ms');
        return result;
      },
    ],
  },
);

module.exports = route;
