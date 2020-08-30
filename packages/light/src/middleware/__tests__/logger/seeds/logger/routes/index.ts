import { createRoute } from '../../../../../../index';

const { route, GET } = createRoute();

GET(() => ({
  hello: 'world',
}));

export default route;
