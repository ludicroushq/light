const { withServerless } = require('light');
const route = require('../routes/index');

module.exports = withServerless(route);
