/* eslint-disable */
const { createRoute } = require('../../../../../index');

const { route } = createRoute('index');

module.exports = route(() => ({ hello: 'world' }));
