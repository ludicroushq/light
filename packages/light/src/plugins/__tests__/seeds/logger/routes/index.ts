import { createRoute } from '../../../../../index';

const { route, get } = createRoute();

get(() => ({
  hello: 'world',
}));

export default route;
