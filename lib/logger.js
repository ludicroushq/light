"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("./pino"));
exports.default = (message) => {
    console.log('logger here with message', message);
    pino_1.default.logger.info(message);
    console.log('done', pino_1.default.logger);
};
