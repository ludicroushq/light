"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const micro_1 = require("micro");
const is_class_1 = __importDefault(require("is-class"));
const lodash_isfunction_1 = __importDefault(require("lodash.isfunction"));
// type AP = Promise<any>;
// interface Route {
//   path?: string;
//   middleware?: any[];
//   plugins?: any[];
//   method?: string[] | string;
//   handler: Handler;
// }
/**
 * @param {Route} route - a class with a handler function or a regular function
 * @returns {function} handler - a function that takes in req, res, and opts and responds
 */
exports.default = (route) => {
    // do as much as possible here
    let endpoint = route;
    if (endpoint.default)
        endpoint = endpoint.default;
    if (!endpoint) {
        throw new Error('route is missing');
    }
    if (is_class_1.default(endpoint)) {
        endpoint = new endpoint();
    }
    else if (!lodash_isfunction_1.default(endpoint) && typeof endpoint !== 'object') {
        throw new Error('route is not a valid type');
    }
    // minimize work here as it is executed in every run
    return async (req, res, opts) => {
        const fn = async (req, res) => {
            return endpoint.handler({
                req,
                res,
            });
        };
        return micro_1.run(req, res, fn);
    };
};
// export default (route: Route): Handler => {
//   const proxy = async (Req: IM, Res: SR): AP => {
//     let exec = async (req: IM, res: SR): AP => {
//       const middleware: any[] = route.middleware || [];
//       for (const mw of middleware) { // eslint-disable-line
//         await mw(req, res); // eslint-disable-line
//         if (res.headersSent) {
//           return null;
//         }
//       }
//       return route.handler(req, res);
//     };
//     const plugins = route.plugins || [];
//     if ((proxy as any).log !== false) {
//       plugins.unshift(logger);
//     }
//     plugins.unshift(youchErrors(isProd));
//     plugins.unshift(handleErrors);
//     if (plugins.length) {
//       exec = plugins.reverse().reduce((acc, val): any => val(acc), exec);
//     }
//     return exec(Req, Res);
//   };
//   const { env } = process;
//   const isNetlify = LIGHT_ENVIRONMENT === 'netlify' || env.LIGHT_ENVIRONMENT === 'netlify';
//   const isAWS = LIGHT_ENVIRONMENT === 'aws' || env.LIGHT_ENVIRONMENT === 'aws';
//   const isRunKit = LIGHT_ENVIRONMENT === 'runkit' || env.LIGHT_ENVIRONMENT === 'runkit';
//   const fn = (isNetlify || isAWS) ? proxy : async (req: IM, res: SR): AP => run(req, res, proxy);
//   Object.assign(fn, route, { handler: fn });
//   /* istanbul ignore if */
//   if (isNetlify || isAWS) {
//     return {
//       handler: AWSServerlessMicro(fn),
//     };
//   }
//   if (isRunKit) {
//     return {
//       endpoint: fn,
//     };
//   }
//   return fn;
// };
