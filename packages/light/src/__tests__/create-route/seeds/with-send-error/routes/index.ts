import { createRoute } from '../../../../../index';

const { route, GET } = createRoute();

GET(async ({ sendError }) => {
  const error = new Error('test should not fail');
  (error as any).statusCode = 401;
  sendError(error);
});

export default route;
