"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const micro_1 = require("micro");
const aws_serverless_micro_1 = __importDefault(require("aws-serverless-micro"));
const micro_boom_1 = require("micro-boom");
const { LIGHT_ENVIRONMENT } = process.env;
const youchErrors = require('./utils/route/youch'); // eslint-disable-line @typescript-eslint/no-var-requires
const logger = require('./utils/route/logger'); // eslint-disable-line @typescript-eslint/no-var-requires
exports.default = (route) => {
    const proxy = async (Req, Res) => {
        let exec = async (req, res) => {
            const middleware = route.middleware || [];
            for (const mw of middleware) { // eslint-disable-line
                await mw(req, res); // eslint-disable-line
                if (res.headersSent) {
                    return null;
                }
            }
            return route.handler(req, res);
        };
        const plugins = route.plugins || [];
        if (proxy.log !== false) {
            plugins.unshift(logger);
            proxy.log = false;
        }
        plugins.unshift(youchErrors);
        plugins.unshift(micro_boom_1.handleErrors);
        if (plugins.length) {
            exec = plugins.reverse().reduce((acc, val) => val(acc), exec);
        }
        return exec(Req, Res);
    };
    const { env } = process;
    const isNetlify = LIGHT_ENVIRONMENT === 'netlify' || env.LIGHT_ENVIRONMENT === 'netlify';
    const isAWS = LIGHT_ENVIRONMENT === 'aws' || env.LIGHT_ENVIRONMENT === 'aws';
    const isRunKit = LIGHT_ENVIRONMENT === 'runkit' || env.LIGHT_ENVIRONMENT === 'runkit';
    const fn = (isNetlify || isAWS) ? proxy : async (req, res) => micro_1.run(req, res, proxy);
    Object.assign(fn, route, { handler: fn });
    fn.log = true;
    fn.module = __dirname;
    /* istanbul ignore if */
    if (isNetlify || isAWS) {
        return {
            handler: aws_serverless_micro_1.default(fn),
        };
    }
    if (isRunKit) {
        return {
            endpoint: fn,
        };
    }
    return fn;
};
