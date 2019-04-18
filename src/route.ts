import { send } from 'micro';
import { IncomingMessage, ServerResponse } from 'http';

interface Route {
  path?: string;
  handler: (req: IncomingMessage, res: ServerResponse) => {};
}

export default (route: Route): (req: IncomingMessage, res: ServerResponse) => {} => {
  const fn = (req: IncomingMessage, res: ServerResponse): any => {
    const run = async (): Promise<any> => route.handler(req, res);
    return run().then((ret: any): any => {
      if (ret) {
        send(res, 200, ret);
      }
    }).catch((err): any => {
      throw new Error(err);
    });
  };
  fn.path = route.path;
  return fn;
};
