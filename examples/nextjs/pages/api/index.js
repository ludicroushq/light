const { createRoute } = require('light');

const { route } = createRoute('index');

export default route((req, res) => {
  // use req/res here
  return {
    hello: 'world',
  };
});
