"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bytes_1 = __importDefault(require("bytes"));
const is_prod_1 = __importDefault(require("../is-prod"));
/* istanbul ignore next */
if (is_prod_1.default) {
    module.exports = (fn) => async (req, res) => 
    // pinoHandler(req, res);
    fn(req, res);
}
else {
    const signale = require('../logger'); // eslint-disable-line
    module.exports = (fn) => async (req, res) => {
        const id = Math.random().toString(36).substring(2, 6);
        const log = signale.scope(id);
        const msg = `${req.url}`;
        const { method } = req;
        if (log[method]) {
            log[method](msg);
        }
        else {
            log.request(msg);
        }
        const done = () => {
            res.removeListener('finish', onfinish); // eslint-disable-line
            res.removeListener('close', onclose); // eslint-disable-line
            const status = res.statusCode;
            const len = res._contentLength; // eslint-disable-line
            let length;
            if ([204, 205, 304].includes(status)) {
                length = '';
            }
            else if (len == null) {
                length = '-';
            }
            else {
                length = bytes_1.default(len).toLowerCase();
            }
            log.response(`${status} ${length}`);
        };
        const onfinish = done.bind(null, 'finish');
        const onclose = done.bind(null, 'close');
        res.once('finish', onfinish);
        res.once('close', onclose);
        return fn(req, res);
    };
}
