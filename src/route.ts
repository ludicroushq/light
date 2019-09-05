import { IncomingMessage, ServerResponse } from 'http';
import { handleErrors } from 'micro-boom';
import pino from 'pino';
import pinoHTTP from 'pino-http';
import Youch from 'youch';
import forTerminal from 'youch-terminal';

import query from './helpers/query';
import pinoPretty from './helpers/pino-pretty';

const youchPlugin = (fun: any): any => async (req: IM, res: SR): Promise<void> => {
  try {
    return await fun(req, res);
  } catch (err) {
    const youch = new Youch(err, req);
    const json = await youch.toJSON();
    console.log(forTerminal(json)); // eslint-disable-line
    return youch.toHTML();
  }
};

type IM = IncomingMessage;
type SR = ServerResponse;
type AP = Promise<any>;

export default class Route {
  public disableRequestLogger: boolean = false;

  public disableErrorHandler: boolean = false;

  public isDev: boolean = false;

  public req: IM;

  public res: SR;

  public logger: any;

  public constructor({ req, res, opts }: { req: IM; res: SR; opts?: any }) {
    const options = opts || {};
    if (options.isDev) {
      this.isDev = true;
    }

    this.req = req;
    this.res = res;

    const pinoOptions = this.isDev ? {
      prettyPrint: true,
      prettifier: pinoPretty,
      level: 'trace',
    } : {};
    this.logger = pino((pinoOptions as any));

    if (!this.disableRequestLogger && options.disableRequestLogger) {
      this.disableRequestLogger = options.disableRequestLogger;
    }
    if (!this.disableErrorHandler && options.disableErrorHandler) {
      this.disableErrorHandler = options.disableErrorHandler;
    }
  }

  public async query(): Promise<any> {
    return query(this.req.url || '');
  }

  public static async query(url: string): Promise<any> {
    return query(url);
  }

  public _getInternalPlugins(): any[] {
    const plugins = [];
    if (!this.disableRequestLogger) {
      const pinoHandler = pinoHTTP({
        logger: this.logger,
      });
      plugins.push((fn: any): any => async (req: IM, res: SR): AP => {
        pinoHandler(req, res);
        return fn(req, res);
      });
    }

    if (!this.disableErrorHandler) {
      const errorHandler = (fun: any): any => async (req: IM, res: SR): Promise<void> => {
        try {
          return await fun(req, res);
        } catch (err) {
          this.logger.error(err);
          throw err;
        }
      };

      // log the error first and then push it to `micro-boom`
      plugins.push(handleErrors);
      plugins.push(errorHandler);
    }

    if (this.isDev) {
      plugins.push(youchPlugin);
    }

    return plugins;
  }
}
