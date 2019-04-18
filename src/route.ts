import { IncomingMessage, ServerResponse } from 'http';

interface Route {
  path?: string;
  handler: (req: IncomingMessage, res: ServerResponse) => {};
}

export default (route: Route): (req: IncomingMessage, res: ServerResponse) => {} => {
  const fn = (req: IncomingMessage, res: ServerResponse): any => route.handler(req, res);
  fn.path = route.path;
  return fn;
};
