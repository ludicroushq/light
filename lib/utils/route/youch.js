"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_prod_1 = __importDefault(require("../is-prod"));
let Youch;
let forTerminal;
/* istanbul ignore next */
if (!is_prod_1.default) {
    Youch = require('youch'); // eslint-disable-line
    forTerminal = require('youch-terminal'); // eslint-disable-line
    module.exports = (fun) => async (req, res) => {
        try {
            return await fun(req, res);
        }
        catch (err) {
            const youch = new Youch(err, req);
            const json = await youch.toJSON();
            console.log(forTerminal(json)); // eslint-disable-line
            throw err;
        }
    };
}
else {
    module.exports = (fun) => async (req, res) => fun(req, res);
}
