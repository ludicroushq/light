import { sync as globSync } from 'glob';

export function findRouteFiles(routesDirPath: string) {
  const routes = globSync('**/*.[jt]s', {
    cwd: routesDirPath,
    // TODO: allow configuration of ignore
    ignore: ['**/__tests__/**/*.[jt]s?(x)', '**/?*.+(spec|test).[tj]s?(x)'],
  });

  return routes;
}
