const { createTest } = require('light')
const request = require('supertest');

// const index = require('../index');
const app = createTest();

it('works with global values', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({
    hello: 'netlify!',
  });
});
