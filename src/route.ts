import { IncomingMessage, ServerResponse } from 'http';

export default class Route {
  logger: any;
  req: IncomingMessage;
  res: ServerResponse;

  public constructor({ req, res }: { req: IncomingMessage, res: ServerResponse}) {
    this.req = req;
    this.res = res;
  }
};
