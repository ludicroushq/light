const { createRoute } = require('light');
const { route, GET } = createRoute();

// useMiddleware(() => console.log('hi'));
// usePlugin((fn) => async (req, res) => {
//   console.log('before');
//   const result = await fn(req, res);
//   console.log('after');
//   return result;
// });

GET(async () => {
  return {
    hello: 'worlds',
  };
});

module.exports = route;
