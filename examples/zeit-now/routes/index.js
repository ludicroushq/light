const { createRoute, useGlobal } = require('light');

const { serverless } = useGlobal();
const { route } = createRoute('index');

module.exports = route(async () => {
  return {
    hello: serverless,
  };
});
