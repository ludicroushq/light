const { createTest } = require('light');
const request = require('supertest');

const { server } = createTest();

it('returns the route', async (done) => {
  expect.assertions(2);
  const response = await request(server).get('/api/v1/test');
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({
    route: 'test',
  });
  done();
});
