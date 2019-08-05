"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_parser_1 = __importDefault(require("path-parser"));
exports.default = async (path, url) => {
    const parser = new path_parser_1.default(path);
    return parser.test(url);
};
