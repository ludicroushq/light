"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signale_1 = require("signale");
const defaults = {
    badge: '',
    color: 'green',
    logLevel: 'info',
};
const options = {
    types: {
        request: Object.assign({}, defaults, { label: 'REQUEST' }),
        response: Object.assign({}, defaults, { label: '<' }),
        start: {
            badge: '',
            label: 'start',
            color: 'redBright',
            logLevel: 'info',
        },
        listening: {
            badge: '',
            label: 'listening',
            color: 'magentaBright',
            logLevel: 'info',
        },
        hmr: {
            badge: '',
            label: 'hmr',
            color: 'blueBright',
            logLevel: 'info',
        },
    },
};
['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'TRACE', 'PATCH'].forEach((method) => {
    options.types[method] = Object.assign({}, defaults, { label: method });
});
const signale = new signale_1.Signale(options);
signale.config({
    displayTimestamp: true,
    displayDate: false,
    underlineLabel: false,
});
module.exports = signale;
exports = signale;
exports.default = signale;
