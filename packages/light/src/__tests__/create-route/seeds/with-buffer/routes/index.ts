import { createRoute } from '../../../../../index';

const { route, POST } = createRoute();

POST(async ({ buffer }) => {
  const body = await buffer();
  return { body: body.toString() };
});

export default route;
