import cors from 'cors';
import supertest from 'supertest';
import { createRouteTest } from '@lightjs/test';
import { withConnect } from '..';
import { createRoute } from '../../createRoute';

describe('withConnect', () => {
  it('cors', async () => {
    const route = createRoute(({ useMiddleware }) => {
      useMiddleware(withConnect(cors()));
      return {
        async GET() {
          return 'OK';
        },
      };
    });
    const server = createRouteTest(route);
    const response = await supertest(server).get('/').expect(200);
    expect(response.status).toBe(200);
    expect(response.headers).toHaveProperty('access-control-allow-origin', '*');
  });

  it('cors configured', async () => {
    const route = createRoute(({ useMiddleware }) => {
      useMiddleware(withConnect(cors({ origin: 'http://localhost:3000' })));
      return {
        async GET() {
          return 'OK';
        },
      };
    });
    const server = createRouteTest(route);
    const response = await supertest(server).get('/').expect(200);
    expect(response.status).toBe(200);
    expect(response.headers).toHaveProperty('access-control-allow-origin', 'http://localhost:3000');
  });
});
