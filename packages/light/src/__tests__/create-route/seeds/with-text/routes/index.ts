import { createRoute } from '../../../../../index';

const { route, post } = createRoute();

post(async ({ text }) => {
  const body = await text();
  return { body };
});

export default route;
