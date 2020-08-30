import { createRoute } from '../../../../../index';

const { route, GET } = createRoute();

GET(() => 'GET works!');

export default route;
