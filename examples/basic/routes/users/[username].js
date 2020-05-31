const { createRoute } = require('light');
const { route, get } = createRoute();

get(({ req, useParams }) => {
  const { username } = useParams('/users/:username');
  return {
    hello: username,
  };
});

module.exports = route;
