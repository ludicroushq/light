// IMPORTANT NOTE: You will need to set LIGHT_ENV=netlify in the Netlify Environment Variables settings
const { createRoute, useGlobal } = require('light');
const { serverless } = useGlobal();
const { route } = createRoute('index');

module.exports = route(async () => {
  return {
    hello: serverless,
  };
});
