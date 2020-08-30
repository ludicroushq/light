import { createRoute } from '../../../../../index';

const { route, GET } = createRoute();

GET(() => {
  throw new Error('test');
});

export default route;
