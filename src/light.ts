import { run } from 'micro';
import { IncomingMessage, ServerResponse } from 'http';
import isClass from 'is-class';
import AWSServerlessMicro from 'aws-serverless-micro';
import { handleErrors } from 'micro-boom';

// import isProd from './utils/is-prod';
// import youchErrors from './utils/plugins/youch';

// const { LIGHT_ENVIRONMENT } = process.env;

// const logger = require('./utils/plugins/logger'); // eslint-disable-line @typescript-eslint/no-var-requires

// TODO: Define types for micro and aws
// TODO: Add test for POST/other methods
// type Handler = any;
type IM = IncomingMessage;
type SR = ServerResponse;
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
export default (route: any): any => {
  // do as much as possible here
  let endpoint = route;
  if (!endpoint) {
    throw new Error('route is missing');
  }
  if (endpoint.default) endpoint = endpoint.default;
  if (!isClass(endpoint)) {
    throw new Error('route is not a class');
  }

  // minimize work inside here as it is executed in every run
  const proxy = async (req: IM, res: SR, opts: any) => {
    const instance = new endpoint({
      req,
      res,
      opts,
    });

    let fn = async (req: IM, res: SR) => {
      // process middleware
      const middleware: any[] = instance.middleware || [];

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
    }

    // process plugins
    const plugins = instance.plugins || [];

    // if ((proxy as any).log !== false) {
    //   plugins.unshift(logger);
    // }

    // plugins.unshift(youchErrors(isProd));
    // plugins.unshift(handleErrors);

    fn = plugins.reverse().reduce((acc: any, val: any): any => val(acc), fn);

    return fn(req, res);
  }

  // transform exports
  let fn = proxy;
  // if now return run()
  // const fn =  async (req: IM, res: SR): Promise<any> => run(req, res, proxy);
  return fn;
}

// export default (route: Route): Handler => {

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
