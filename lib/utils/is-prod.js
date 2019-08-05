"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';
exports.default = isProd;
