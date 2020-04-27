import { join } from 'path';
import { sync as globSync } from 'glob';

export default (rootPath: string): string[] => {
  const routesDir = join(rootPath, './routes');
  const routes = globSync('**/*.[jt]s', {
    cwd: routesDir,
    ignore: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  });

  return routes;
};
