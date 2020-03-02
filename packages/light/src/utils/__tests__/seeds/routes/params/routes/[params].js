/* eslint-disable */
/* istanbul ignore file */
const { createRoute } = require('../../../../../../index');

const { route } = createRoute('index');

module.exports = route(() => ({ hello: 'world' }));
