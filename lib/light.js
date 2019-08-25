"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const micro_1 = require("micro");
const is_class_1 = __importDefault(require("is-class"));
const aws_serverless_micro_1 = __importDefault(require("aws-serverless-micro"));
const { LIGHT_ENV } = process.env;
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
        let fn = async (Req, Res) => {
            // process middleware
            const middleware = instance.middleware || [];
            for (const mw of middleware) { // eslint-disable-line
                await mw(Req, Res); // eslint-disable-line
                if (Res.headersSent) {
                    return null;
                }
            }
            return instance.handler({
                Req,
                Res,
            });
        };
        // process plugins
        const plugins = [...instance._getInternalPlugins(), ...(instance.plugins || [])];
        fn = plugins.reverse().reduce((acc, val) => val(acc), fn);
        return fn(req, res);
    };
    // detect if serverless environment
    const { env } = process;
    const isNetlify = LIGHT_ENV === 'netlify' || env.LIGHT_ENV === 'netlify';
    const isAWS = LIGHT_ENV === 'aws' || env.LIGHT_ENV === 'aws';
    const isRunKit = LIGHT_ENV === 'runkit' || env.LIGHT_ENV === 'runkit';
    const isNow = LIGHT_ENV === 'now' || env.LIGHT_ENV === 'now';
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
