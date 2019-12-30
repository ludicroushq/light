/* eslint-disable no-shadow */
import { router } from '../../../src';

const { route, routes } = router();

route.get(['/home', '/test'], 'index');

route.post('testing/index', 'testing');

route.all('/graphql', 'graphql');

route.namespace('api', (route: any) => {
  route.namespace('v1', (route: any) => {
    route.get('/test', 'api/v1/test');
  });
});

export default routes;
