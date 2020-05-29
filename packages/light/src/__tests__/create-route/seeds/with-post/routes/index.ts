import { createRoute } from '../../../../../index';

const { route, post } = createRoute();

post(() => 'post works!');

export default route;
