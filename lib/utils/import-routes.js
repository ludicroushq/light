"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const http_1 = require("http");
const logger_1 = __importDefault(require("./logger"));
exports.default = (routes, routesPath) => routes.map((route) => {
    let handler;
    try {
        handler = require(route); // eslint-disable-line
        if (handler.default) {
            handler = handler.default;
        }
    }
    catch (err) {
        logger_1.default.error(`unable to import route ${route}`);
        logger_1.default.fatal(err);
        throw new Error('please fix the route and try again');
    }
    const path = path_1.relative(routesPath, route);
    return {
        file: route,
        method: http_1.METHODS,
        handler,
        path,
    };
});