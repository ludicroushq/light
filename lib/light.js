"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const micro_1 = require("micro");
const is_class_1 = __importDefault(require("is-class"));
const aws_serverless_micro_1 = __importDefault(require("aws-serverless-micro"));
// import youchErrors from './utils/plugins/youch';
// const logger = require('./utils/plugins/logger'); // eslint-disable-line @typescript-eslint/no-var-requires
const { LIGHT_ENVIRONMENT } = process.env;
/**
 * @param {Route} route - a class with a handler function or a regular function
 * @returns {function} handler - a function that takes in req, res, and opts and responds
 */
exports.default = (route) => {
    // do as much as possible here
    let endpoint = route;
    if (!endpoint) {
        throw new Error('route is missing');
    }
    if (endpoint.default)
        endpoint = endpoint.default;
    if (!is_class_1.default(endpoint)) {
        throw new Error('route is not a class');
    }
    // minimize work inside here as it is executed in every run
    const proxy = async (req, res, opts) => {
        const instance = new endpoint({
            req,
            res,
            opts,
        });
        let fn = async (req, res) => {
            // process middleware
            const middleware = instance.middleware || [];
            for (const mw of middleware) { // eslint-disable-line
                await mw(req, res); // eslint-disable-line
                if (res.headersSent) {
                    return null;
                }
            }
            return instance.handler({
                req,
                res,
            });
        };
        // process plugins
        const plugins = [...instance._getInternalPlugins(), ...(instance.plugins || [])];
        // if ((proxy as any).log !== false) {
        //   plugins.unshift(logger);
        // }
        // plugins.unshift(youchErrors(isProd));
        fn = plugins.reverse().reduce((acc, val) => val(acc), fn);
        return fn(req, res);
    };
    // detect if serverless environment
    const { env } = process;
    const isNetlify = LIGHT_ENVIRONMENT === 'netlify' || env.LIGHT_ENVIRONMENT === 'netlify';
    const isAWS = LIGHT_ENVIRONMENT === 'aws' || env.LIGHT_ENVIRONMENT === 'aws';
    const isRunKit = LIGHT_ENVIRONMENT === 'runkit' || env.LIGHT_ENVIRONMENT === 'runkit';
    const isNow = LIGHT_ENVIRONMENT === 'now' || env.LIGHT_ENVIRONMENT === 'now';
    const isServerless = isNetlify || isAWS || isRunKit || isNow;
    // transform exports
    let fn = proxy;
    if (isServerless) {
        if (isRunKit || isNow) {
            // TODO: test this in runkit and now tests
            /* istanbul ignore next */
            fn = async (req, res) => micro_1.run(req, res, proxy);
        }
        if (isNetlify || isAWS) {
            fn = {
                handler: aws_serverless_micro_1.default(proxy),
            };
        }
        if (isRunKit) {
            fn = {
                endpoint: fn,
            };
        }
    }
    return fn;
};
