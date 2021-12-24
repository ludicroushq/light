import cors from 'cors';
import supertest from 'supertest';
import { withConnect } from '..';
import { createRoute } from '../../createRoute';

it('withConnect cors', () => {
  const route = createRoute(({ useMiddleware }) => {
    useMiddleware(withConnect(cors()));
    return {
      async GET() {
        return 'OK';
      },
    };
  });
  supertest(route).get('/').expect(200).expect('ACCESS-CONTROL-ALLOW-ORIGIN', '*');
});
