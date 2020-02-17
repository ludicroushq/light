import { METHODS } from 'http';
import join from 'url-join';
import camelCase from 'lodash.camelcase';

import { RouteObject } from '../src/types/route';

// TODO: clean up interfaces
// TODO: write tests

export default (): any => {
  // closures
  const _routes: RouteObject[] = [];

  const getRouterObj = (namespace: string): any => {
    const obj: any = {
      namespace(name: string, handler: (route: any) => {}): void {
        handler(getRouterObj(join(namespace, name)));
      },
    };

    [...METHODS, 'all'].forEach((method: string): void => {
      const name = camelCase(method);
      obj[name] = (rawPath: string | string[], handler: string): void => {
        let path: any = rawPath;
        if (typeof rawPath === 'string') {
          path = [path];
        }
        path = path.map((r: string): string => join('/', namespace, r));
        _routes.push({
          method: (method === 'all') ? METHODS : method,
          path,
          handler: join('/', handler),
        });
      };
    });
    return obj;
  };

  return {
    routes: _routes,
    route: getRouterObj(''),
  };
};
