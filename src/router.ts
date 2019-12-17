import { METHODS } from 'http';
import join from 'url-join';
import camelCase from 'lodash.camelcase';

interface RouterRouteType {
  method: string;
  path: string;
  handler: string;
}

export default (): any => {
  // closures
  const _routes: RouterRouteType[] = [];

  const getRouterObj = (namespace: string): any => {
    const obj: any = {
      namespace(name: string, handler: (route: any) => {}): void {
        handler(getRouterObj(join(namespace, name)));
      },
    };

    METHODS.forEach((method: string): void => {
      const name = camelCase(method);
      obj[name] = (rawPath: string, handler: string): void => {
        const path = join('/', namespace, rawPath);
        _routes.push({
          method,
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
