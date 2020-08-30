import { createRoute } from '../../../../../index';

const { route, POST } = createRoute();

POST(async ({ text }) => {
  const body = await text();
  return { body };
});

export default route;
