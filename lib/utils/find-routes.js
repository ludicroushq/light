"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const glob_1 = __importDefault(require("./glob"));
exports.default = (routesPath) => {
    const routes = [];
    const addRoutes = (path) => {
        const files = glob_1.default(path_1.join('/', path), '**/*.{js,ts}');
        return routes.push(...files);
    };
    addRoutes(routesPath);
    return routes;
};
