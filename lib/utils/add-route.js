"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.default = (router, route) => {
    const endpoint = route;
    if (typeof endpoint.path === 'string') {
        endpoint.path = [endpoint.path];
    }
    endpoint.path = endpoint.path.map((p) => {
        const { name } = path_1.parse(p);
        return path_1.join('/', name);
    });
    // if the path is /index, map it to the root route as well
    if (endpoint.path.includes('/index')) {
        endpoint.path.push('/');
    }
    if (!endpoint.method) {
        endpoint.method = ['GET']; // default to GET
    }
    if (!Array.isArray(endpoint.method)) {
        endpoint.method = [endpoint.method];
    }
    endpoint.method = endpoint.method.map((m) => m.toUpperCase());
    endpoint.path.forEach((path) => {
        router.on(endpoint.method, path, endpoint.handler);
    });
};
