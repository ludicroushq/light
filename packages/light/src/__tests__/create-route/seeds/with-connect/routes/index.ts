import { createRoute } from '../../../../../index';
import { withConnect } from '../../../../../with-connect';

const { route, GET, useMiddleware } = createRoute();

useMiddleware(
  withConnect((req: any, res: any, next: any) => {
    req.test = true;
    next();
  }),
);

GET(({ req }) => ({ test: (req as any).test }));

export default route;
