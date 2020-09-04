const { createRoute } = require('light');

const { route, GET } = createRoute('index');

GET(() => 'hello world!');

export default route;
