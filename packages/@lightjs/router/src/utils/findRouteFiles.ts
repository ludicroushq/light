import { join } from 'path';
import { sync as globSync } from 'glob';

export function findRouteFiles(rootPath: string) {
  const routesDir = join(rootPath, './routes');
  const routes = globSync('**/*.[jt]s', {
    cwd: routesDir,
    // TODO: allow configuration of ignore
    ignore: ['**/__tests__/**/*.[jt]s?(x)', '**/?*.+(spec|test).[tj]s?(x)'],
  });

  return routes;
}
