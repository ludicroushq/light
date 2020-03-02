import { join } from 'path';
import { sync as globSync } from 'glob';

export default (rootPath: string): string[] => {
  const routesDir = join(rootPath, './routes');
  const routes = globSync('**/*.js', {
    cwd: routesDir,
    ignore: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  });

  return routes;
};
