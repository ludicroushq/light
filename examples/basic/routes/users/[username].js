const { createRoute } = require('light');
const { route, get } = createRoute();

get(({ req, useParams }) => {
  const { username } = useParams('/users/:username', req.url);
  return {
    hello: username,
  };
});

module.exports = route;
