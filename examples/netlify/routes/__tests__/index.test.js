const request = require('supertest');

const index = require('../index');

it('works with global values', async (done) => {
  expect.assertions(2);
  const response = await request(index).get('/');
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({
    hello: 'netlify!',
    global: 'does not work :(',
    serverless: 'this will not show up once you deploy',
  });
  done();
});
