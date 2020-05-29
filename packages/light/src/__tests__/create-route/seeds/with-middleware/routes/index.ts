import { createRoute } from '../../../../../index';

const { route, get, useMiddleware } = createRoute();

useMiddleware(({ req }) => {
  (req as any).test = true;
});

get(({ req }) => ({ test: (req as any).test }));

export default route;
