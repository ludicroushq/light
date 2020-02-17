import Router from 'find-my-way';

import { Route } from '../types/route';

export default (router: Router.Instance<Router.HTTPVersion.V1>, routes: Route[]): void => {
  routes.forEach((route): void => {
    router.all(route.path, route.handler);
  });
};
