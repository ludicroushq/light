"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
let cwd = process.cwd();
const requirePaths = [];
while (cwd !== '/') {
    requirePaths.push(cwd);
    cwd = path_1.default.join(cwd, '../');
}
const configPaths = requirePaths.map(p => path_1.default.join(p, 'config/logger.js'));
const config = configPaths.reduce((acc, val) => {
    if (acc) {
        return acc;
    }
    if (fs_1.existsSync(val)) {
        try {
            console.log('requiring');
            return require(val);
        }
        catch (err) {
            console.log(`unable to import light.config.js: ${err}`);
        }
    }
    return false;
}, false);
exports.default = (message) => {
    if (config) {
        config(console.log)(message);
    }
    else {
        console.log(message);
    }
};
