"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const micro_boom_1 = require("micro-boom");
const pino_1 = __importDefault(require("pino"));
const pino_http_1 = __importDefault(require("pino-http"));
const youch_1 = __importDefault(require("youch"));
const youch_terminal_1 = __importDefault(require("youch-terminal"));
const youchPlugin = (fun) => async (req, res) => {
    try {
        return await fun(req, res);
    }
    catch (err) {
        const youch = new youch_1.default(err, req);
        const json = await youch.toJSON();
        console.log(youch_terminal_1.default(json)); // eslint-disable-line
        return youch.toHTML();
    }
};
class Route {
    constructor({ req, res, opts }) {
        this.disableRequestLogger = false;
        this.disableErrorHandler = false;
        this.isDev = false;
        this.req = req;
        this.res = res;
        const options = opts || {};
        if (!this.disableRequestLogger && options.disableRequestLogger) {
            this.disableRequestLogger = options.disableRequestLogger;
        }
        if (!this.disableErrorHandler && options.disableErrorHandler) {
            this.disableErrorHandler = options.disableErrorHandler;
        }
        if (options.isDev) {
            this.isDev = true;
        }
    }
    _getInternalPlugins() {
        const plugins = [];
        if (!this.disableRequestLogger) {
            this.logger = pino_1.default();
            const pinoHandler = pino_http_1.default({
                logger: this.logger,
            });
            plugins.push((fn) => async (req, res) => {
                pinoHandler(req, res);
                return fn(req, res);
            });
        }
        if (!this.disableErrorHandler) {
            plugins.push(micro_boom_1.handleErrors);
        }
        if (this.isDev) {
            plugins.push(youchPlugin);
        }
        return plugins;
    }
}
exports.default = Route;
