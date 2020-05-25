import { createRoute } from '../../../../index';

const { route, get } = createRoute();

get(() => ({
  hello: 'test',
}));

export default route;
