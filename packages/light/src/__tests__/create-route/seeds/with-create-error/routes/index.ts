import { createRoute } from '../../../../../index';

const { route, GET } = createRoute();

GET(async ({ createError }) => {
  throw createError(401, 'test should not fail');
});

export default route;
