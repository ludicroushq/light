import { createRoute } from '../../../../../index';

const { route, POST } = createRoute();

POST(() => 'POST works!');

export default route;
