import { TestOptions } from './types/route';
import { createServer } from './index';
import findRoutes from './utils/find-routes';
import genRoutes from './utils/gen-routes';
import importConfig from './utils/import-config';

export default (path?: string, opts?: TestOptions): any => {
  // generate a server with only the route provided
  const cwd = path || process.cwd();

  const config = importConfig(cwd);
  (global as any).light = (config || {}).global || {};

  const options = {
    requestLogger: false,
    dev: false,
    ...(opts || {}),
  };

  const routePaths = findRoutes(cwd);
  const routes = genRoutes(routePaths, cwd);
  const app = createServer({ routes, opts: options });

  return app;
};
