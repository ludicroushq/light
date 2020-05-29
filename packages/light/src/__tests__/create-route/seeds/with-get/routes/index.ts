import { createRoute } from '../../../../../index';

const { route, get } = createRoute();

get(() => 'get works!');

export default route;
