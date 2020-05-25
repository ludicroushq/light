// IMPORTANT NOTE: You will need to set LIGHT_ENV=netlify in the Netlify Environment Variables settings
const { createRoute } = require('light');
const { route, get } = createRoute();

get(() => ({
  hello: 'netlify!',
}));

module.exports = route;
