import { IncomingMessage, ServerResponse } from 'http';
import { handleErrors } from 'micro-boom';
import pino from 'pino';
import pinoHTTP from 'pino-http';

export default class Route {
  disableRequestLogger: boolean = false;
  disableErrorHandler: boolean = false;

  req: IncomingMessage;
  res: ServerResponse;

  logger: any;

  public constructor({ req, res, opts }: { req: IncomingMessage, res: ServerResponse, opts: any }) {
    this.req = req;
    this.res = res;

    if (!this.disableRequestLogger && opts.disableRequestLogger) {
      this.disableRequestLogger = opts.disableRequestLogger;
    }
    if (!this.disableErrorHandler && opts.disableErrorHandler) {
      this.disableErrorHandler = opts.disableErrorHandler;
    }
  }

  public _getInternalPlugins() {
    const plugins = [];
    if (!this.disableRequestLogger) {
      this.logger = pino();
      const pinoHandler = pinoHTTP({
        logger: this.logger,
      });
      plugins.push((fn: any): any => async (req: IncomingMessage, res: ServerResponse): Promise<any> => {
        pinoHandler(req, res);
        return fn(req, res);
      });
    }

    if (!this.disableErrorHandler) {
      plugins.push(handleErrors);
    }

    return plugins;
  }
};
