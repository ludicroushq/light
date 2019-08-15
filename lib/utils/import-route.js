"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const lodash_isfunction_1 = __importDefault(require("lodash.isfunction"));
const logger_1 = __importDefault(require("./logger"));
const index_1 = require("../index");
exports.default = (router, routeData, opts) => {
    let handler;
    if (typeof routeData.path === 'string') {
        try {
            handler = require(routeData.path); // eslint-disable-line
            if (handler.default) {
                handler = handler.default;
            }
        }
        catch (err) {
            logger_1.default.error(`unable to import route ${routeData.path}`);
            logger_1.default.fatal(err);
            return;
        }
    }
    else {
        ({ handler } = routeData);
        if (!lodash_isfunction_1.default(routeData.handler)) {
            handler = index_1.light(routeData.handler);
        }
    }
    if (lodash_isfunction_1.default(handler) && !handler.path && routeData.name) {
        const { name, dir } = path_1.parse(routeData.name);
        const path = path_1.join('/', dir, name === 'index' ? '/' : name);
        handler.log = opts.log;
        router.all(path, handler);
        return;
    }
    let route = {};
    if (!handler.handler) {
        route.handler = handler;
        route.path = handler.path;
    }
    else {
        route = Object.assign({}, handler);
    }
    if (!route.path && routeData.name) {
        const { name, dir } = path_1.parse(routeData.name);
        route.path = path_1.join(dir, name);
    }
    if (!Array.isArray(route.path)) {
        route.path = [route.path];
    }
    route.path = route.path.map((p) => path_1.join('/', p));
    route.handler.log = opts.log;
    if (!route.method) {
        route.method = ['GET']; // default to GET
    }
    if (!Array.isArray(route.method)) {
        route.method = [route.method];
    }
    route.method = route.method.map((m) => m.toUpperCase());
    route.path.forEach((path) => {
        router.on(route.method, path, route.handler);
    });
};
