import { createRoute } from '../../../../../index';

const { route, post } = createRoute();

post(async ({ json }) => {
  const body = await json();
  return body;
});

export default route;
