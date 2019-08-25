import { IncomingMessage, ServerResponse } from 'http';
import { handleErrors } from 'micro-boom';
import pino from 'pino';
import pinoHTTP from 'pino-http';

type IM = IncomingMessage;
type SR = ServerResponse;
type AP = Promise<any>;

export default class Route {
  public disableRequestLogger: boolean = false;

  public disableErrorHandler: boolean = false;

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

    return plugins;
  }
}
