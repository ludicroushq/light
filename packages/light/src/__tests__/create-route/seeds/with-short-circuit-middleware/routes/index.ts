import { createRoute } from '../../../../../index';

const { route, GET, useMiddleware } = createRoute();

useMiddleware(() => async () => 'short circuit');

GET(() => ({ oops: 'somethings wrong' }));

export default route;
