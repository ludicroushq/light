import { router } from '../../../src';

const { route, routes } = router();

route.get('/', 'index');
route.get('/testing', 'index');

module.exports = routes;
