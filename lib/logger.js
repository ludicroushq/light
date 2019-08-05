"use strict";
const { Signale } = require('signale');
const defaults = {
    color: 'green',
    logLevel: 'info'
};
const options = {
    types: {
        request: Object.assign({}, defaults, { label: 'REQUEST' }),
    }
};
['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'TRACE', 'PATCH'].forEach((method) => {
    options.types[method] = Object.assign({}, defaults, { label: method });
});
const signale = new Signale(options);
signale.config({
    displayTimestamp: true,
    displayDate: false,
    underlineLabel: false,
});
module.exports = signale;
