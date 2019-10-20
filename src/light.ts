import { run } from 'micro';
import { IncomingMessage, ServerResponse } from 'http';
import isClass from 'is-class';
import AWSServerlessMicro from 'aws-serverless-micro';

const { LIGHT_ENV } = process.env;

type IM = IncomingMessage;
type SR = ServerResponse;
type AP = Promise<any>;

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

  // minimize work inside here as it is executed in every run
  const proxy = async (req: IM, res: SR, opts: any): AP => {
    // const instance = new endpoint({ // eslint-disable-line
    //   req,
    //   res,
    //   opts,
    // });

    let fn = async (Req: IM, Res: SR): AP => {
      // process middleware
      // const middleware: any[] = instance.middleware || [];

      // for (const mw of middleware) { // eslint-disable-line
      //   await mw(Req, Res); // eslint-disable-line

      //   if (Res.headersSent) {
      //     return null;
      //   }
      // }

      return endpoint(Req, Res);
    };

    // process plugins
    // const plugins = [...instance._getInternalPlugins(), ...(instance.plugins || [])];

    // fn = plugins.reverse().reduce((acc: any, val: any): any => val(acc), fn);

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
  let fn: any = proxy;
  if (isServerless) {
    if (isRunKit || isNow) {
      // TODO: test this in runkit and now tests
      /* istanbul ignore next */
      fn = async (req: IM, res: SR): AP => run(req, res, (proxy as any));
    }
    if (isNetlify || isAWS) {
      fn = {
        handler: AWSServerlessMicro(proxy),
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
