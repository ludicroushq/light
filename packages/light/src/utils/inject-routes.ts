import Router from 'find-my-way';

import { RouteObject } from '../types/route';

export default (
  router: Router.Instance<Router.HTTPVersion.V1>,
  routes: RouteObject[],
  plugins: any[] = [],
): void => {
  routes.forEach((route): void => {
    let { handler } = route;
    handler = plugins
      .reverse()
      .reduce((acc: any, val: any): any => val(acc), handler);
    router.all(route.path, (req, res): any => handler(req, res));
  });
};
