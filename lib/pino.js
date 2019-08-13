"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const pino_http_1 = __importDefault(require("pino-http"));
const logger_1 = __importDefault(require("./utils/logger"));
let cwd = process.cwd();
const requirePaths = [];
while (cwd !== '/') {
    requirePaths.push(cwd);
    cwd = path_1.default.join(cwd, '../');
}
const configPaths = requirePaths.map((p) => path_1.default.join(p, 'light.config.js'));
const config = configPaths.reduce((acc, val) => {
    let conf = {};
    if (fs_1.existsSync(val)) {
        try {
            console.log('requiring');
            conf = require(val);
        }
        catch (err) {
            logger_1.default.error(`unable to import light.config.js: ${err}`);
        }
    }
    return Object.assign({}, acc, conf);
}, {});
let logger;
if (config.logger) {
    logger = config.logger(pino_http_1.default);
}
else {
    logger = pino_http_1.default();
}
exports.default = logger;
