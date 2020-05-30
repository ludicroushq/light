import { createRoute } from '../../../../../index';

const { route, get, useConnect } = createRoute();

useConnect((req: any, res: any, next: any) => {
  req.test = true;
  next();
});

get(({ req }) => ({ test: (req as any).test }));

export default route;
