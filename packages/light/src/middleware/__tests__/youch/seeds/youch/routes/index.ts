import { createRoute } from '../../../../../../index';

const { route, GET } = createRoute();

GET(() => {
  throw new Error('testing');
});

export default route;
