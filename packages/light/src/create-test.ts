import { createServer } from './index';

export default (): any => {
  // generate a server with only the route provided
  // const cwd = process.cwd();

  // const options = {
  //   requestLogger: false,
  //   dev: false,
  //   ...(opts || {}),
  // };

  const app = createServer({
    requestLogger: false,
  });

  return app.server;
};
