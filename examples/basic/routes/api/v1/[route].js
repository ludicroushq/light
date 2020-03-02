const { createRoute, params } = require('light');

const { route } = createRoute('index');

module.exports = route(async (req, res) => {
  const { route } = await params('/api/v1/:route', req.url);
  return {
    route: route,
  };
});
