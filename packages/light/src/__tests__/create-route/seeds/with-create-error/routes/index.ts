import { createRoute } from '../../../../../index';

const { route, get } = createRoute();

get(async ({ createError }) => {
  throw createError(401, 'test should not fail');
});

export default route;
