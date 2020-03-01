import { join } from 'path';
import glob from 'glob';
import { promisify } from 'util';

const globAsync = promisify(glob);

export default async (rootPath: string): Promise<string[]> => {
  const routesDir = join(rootPath, './routes');
  const routes = await globAsync('**/*.js', {
    cwd: routesDir,
    ignore: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  });

  return routes;
};
