import Router from 'find-my-way';

import { Route, Options } from '../types/route';

export default (
  router: Router.Instance<Router.HTTPVersion.V1>,
  routes: Route[],
  opts?: Options,
): void => {
  routes.forEach((route): void => {
    router.all(route.path, (req, res): any => route.handler(req, res, opts));
  });
};
