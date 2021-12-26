import helmet from 'helmet';
import supertest from 'supertest';
import { createRouteTest } from '@lightjs/test';
import { withConnect } from '..';
import { createRoute } from '../../createRoute';

describe('withConnect', () => {
  it('helmet', async () => {
    const route = createRoute(({ useMiddleware }) => {
      useMiddleware(withConnect(helmet()));
      return {
        async GET() {
          return 'OK';
        },
      };
    });
    const server = createRouteTest(route);
    const response = await supertest(server).get('/').expect(200);
    expect(response.status).toBe(200);
    expect(response.headers).toHaveProperty('content-security-policy');
    expect(response.headers).toHaveProperty('x-dns-prefetch-control', 'off');
    expect(response.headers).toHaveProperty('expect-ct', 'max-age=0');
    expect(response.headers).toHaveProperty('x-frame-options', 'SAMEORIGIN');
    expect(response.headers).toHaveProperty(
      'strict-transport-security',
      'max-age=15552000; includeSubDomains',
    );
    expect(response.headers).toHaveProperty('x-download-options', 'noopen');
    expect(response.headers).toHaveProperty('x-content-type-options', 'nosniff');
    expect(response.headers).toHaveProperty('x-permitted-cross-domain-policies', 'none');
    expect(response.headers).toHaveProperty('referrer-policy', 'no-referrer');
    expect(response.headers).toHaveProperty('x-xss-protection', '0');
  });

  it('helmet configured', async () => {
    const route = createRoute(({ useMiddleware }) => {
      useMiddleware(withConnect(helmet({ referrerPolicy: { policy: 'origin' } })));
      return {
        async GET() {
          return 'OK';
        },
      };
    });
    const server = createRouteTest(route);
    const response = await supertest(server).get('/').expect(200);
    expect(response.status).toBe(200);
    // Changed
    expect(response.headers).toHaveProperty('referrer-policy', 'origin');
    // Same as above
    expect(response.headers).toHaveProperty('content-security-policy');
    expect(response.headers).toHaveProperty('x-dns-prefetch-control', 'off');
    expect(response.headers).toHaveProperty('expect-ct', 'max-age=0');
    expect(response.headers).toHaveProperty('x-frame-options', 'SAMEORIGIN');
    expect(response.headers).toHaveProperty(
      'strict-transport-security',
      'max-age=15552000; includeSubDomains',
    );
    expect(response.headers).toHaveProperty('x-download-options', 'noopen');
    expect(response.headers).toHaveProperty('x-content-type-options', 'nosniff');
    expect(response.headers).toHaveProperty('x-permitted-cross-domain-policies', 'none');
    expect(response.headers).toHaveProperty('x-xss-protection', '0');
  });
});
