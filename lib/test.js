"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_listen_1 = __importDefault(require("test-listen"));
const index_1 = require("./index");
// TODO: support multiple routes with a given route object
exports.default = async (route, opts) => {
    // generate a server with only the route provided
    const options = Object.assign({ disableRequestLogger: true }, (opts || {}));
    const app = index_1.server({
        routes: [
            {
                handler: async (req, res) => route(req, res, options),
                method: 'GET',
                path: '/',
            },
        ],
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
