import { createRoute } from '../../../../../index';

const { route, all } = createRoute();

all(() => 'all works!');

export default route;
