import { createRoute } from '../../../../../index';

const { route, POST } = createRoute();

POST(async ({ json }) => {
  const body = await json();
  return body;
});

export default route;
