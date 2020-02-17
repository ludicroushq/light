import { join } from 'path';
import glob from 'glob';
import { promisify } from 'util';

const globAsync = promisify(glob);

export default async (rootPath: string): Promise<string[]> => {
  const routesDir = join(rootPath, './routes');
  const routes = await globAsync('**/*.js', { cwd: routesDir });

  return routes;
};
