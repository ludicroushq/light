"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
exports.default = async (url) => {
    const { searchParams } = new url_1.URL(url, 'http://localhost');
    const params = {};
    Array.from(searchParams.keys()).forEach((key) => {
        let value = searchParams.getAll(key);
        if (value.length === 1) {
            [value] = value;
        }
        params[key] = value;
    });
    return params;
};
