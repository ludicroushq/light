import { createRoute } from '../../../../index';

const { route, GET } = createRoute();

GET(() => ({
  hello: 'test',
}));

export default route;
