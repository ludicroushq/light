import { IncomingMessage, ServerResponse } from 'http';
import { handleErrors } from 'micro-boom';
import pino from 'pino';
import pinoHTTP from 'pino-http';
import Youch from 'youch';
import forTerminal from 'youch-terminal';

const youchPlugin = (fun: any): any => async (req: IM, res: SR): Promise<void> => {
  try {
    return await fun(req, res);
  } catch (err) {
    const youch = new Youch(err, req);
    const json = await youch.toJSON();
    console.log(forTerminal(json)); // eslint-disable-line
    return await youch.toHTML();
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
    this.req = req;
    this.res = res;

    const options = opts || {};

    if (!this.disableRequestLogger && options.disableRequestLogger) {
      this.disableRequestLogger = options.disableRequestLogger;
    }
    if (!this.disableErrorHandler && options.disableErrorHandler) {
      this.disableErrorHandler = options.disableErrorHandler;
    }

    if (options.isDev) {
      this.isDev = true;
    }
  }

  public _getInternalPlugins(): any[] {
    const plugins = [];
    if (!this.disableRequestLogger) {
      this.logger = pino();
      const pinoHandler = pinoHTTP({
        logger: this.logger,
      });
      plugins.push((fn: any): any => async (req: IM, res: SR): AP => {
        pinoHandler(req, res);
        return fn(req, res);
      });
    }

    if (!this.disableErrorHandler) {
      plugins.push(handleErrors);
    }

    if (this.isDev) {
      plugins.push(youchPlugin);
    }

    return plugins;
  }
}
