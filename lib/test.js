"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_listen_1 = __importDefault(require("test-listen"));
const index_1 = require("./index");
exports.default = async (routes, opts) => {
    const options = Object.assign({}, opts, {
        log: false,
    });
    let handlers = [];
    if (typeof routes === 'string') {
        handlers.push(routes);
    }
    else {
        handlers = routes;
    }
    const app = index_1.server({
        routes: handlers,
        log: options.log,
    });
    const url = await test_listen_1.default(app.server);
    return {
        url,
        app,
        server: app.server,
        close() {
            this.server.close();
        },
    };
};
