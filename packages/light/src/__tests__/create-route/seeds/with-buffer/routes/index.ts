import { createRoute } from '../../../../../index';

const { route, post } = createRoute();

post(async ({ buffer }) => {
  const body = await buffer();
  return { body: body.toString() };
});

export default route;
