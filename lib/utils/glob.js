"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const micromatch_1 = __importDefault(require("micromatch"));
/* istanbul ignore next */
const ls = (dir, filelist = []) => fs_1.default.readdirSync(dir)
    .map((file) => (fs_1.default.statSync(path_1.default.join(dir, file)).isDirectory()
    ? ls(path_1.default.join(dir, file), filelist)
    : filelist.concat(path_1.default.join(dir, file))[0]));
const flatten = (arr) => arr.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val)), []);
exports.default = (url, glob) => {
    const files = flatten(ls(url, []));
    return micromatch_1.default(files, glob);
};
