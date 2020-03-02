const { createRoute, useParams } = require('light');

const { route } = createRoute('index');

module.exports = route(async (req, res) => {
  const { route } = await useParams('/api/v1/:route', req.url);
  return {
    route: route,
  };
});
