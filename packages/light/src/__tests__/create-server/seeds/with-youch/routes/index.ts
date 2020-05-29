import { createRoute } from '../../../../../index';

const { route, get } = createRoute();

get(() => {
  throw new Error('test');
});

export default route;
