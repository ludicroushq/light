import { createRoute } from '../../../../../../index';

const { route, get } = createRoute();

get(() => {
  throw new Error('testing');
});

export default route;
