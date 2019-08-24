"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const micro_boom_1 = require("micro-boom");
const pino_1 = __importDefault(require("pino"));
const pino_http_1 = __importDefault(require("pino-http"));
class Route {
    constructor({ req, res, opts }) {
        this.disableRequestLogger = false;
        this.disableErrorHandler = false;
        this.req = req;
        this.res = res;
        if (!this.disableRequestLogger && opts.disableRequestLogger) {
            this.disableRequestLogger = opts.disableRequestLogger;
        }
        if (!this.disableErrorHandler && opts.disableErrorHandler) {
            this.disableErrorHandler = opts.disableErrorHandler;
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
        return plugins;
    }
}
exports.default = Route;
;
