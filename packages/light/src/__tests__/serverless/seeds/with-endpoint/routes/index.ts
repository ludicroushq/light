import { createRoute } from '../../../../../index';

const { route, GET } = createRoute();

GET(async () => ({ hello: 'world' }));

export default route;
