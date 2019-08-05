"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore file */
const colorette_1 = require("colorette");
const color = (clr, message) => {
    switch (clr) {
        case 'brightblue':
            return colorette_1.blueBright(message);
        case 'brightred':
            return colorette_1.redBright(message);
        case 'red':
            return colorette_1.red(message);
        case 'green':
            return colorette_1.green(message);
        case 'yellow':
            return colorette_1.yellow(message);
        default:
            return message;
    }
};
exports.default = (title, message, opts = {}) => {
    let str = '';
    if (title) {
        str += `[ ${color(opts.titleColor, title)} ] `;
    }
    let i = title.length;
    while (i < 6) {
        str += ' ';
        i += 1;
    }
    str += color(opts.messageColor, message);
    console.log(str); // eslint-disable-line
};
