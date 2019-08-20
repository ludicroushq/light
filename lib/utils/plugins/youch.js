"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let Youch;
let forTerminal;
exports.default = (isProd) => {
    if (isProd) {
        return (fun) => async (req, res) => fun(req, res);
    }
    Youch = require('youch'); // eslint-disable-line
    forTerminal = require('youch-terminal'); // eslint-disable-line
    return (fun) => async (req, res) => {
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
};
