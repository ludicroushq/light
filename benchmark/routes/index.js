const { createRoute } = require('light');

const { route, GET } = createRoute();

GET(() => ({ hello: 'world' }));

module.exports = route;
