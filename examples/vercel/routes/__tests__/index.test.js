const supertest = require('supertest');
const { createTest } = require('light')

const { server } = createTest();

it('works with global values', async () => {
  const response = await supertest(server).get('/');
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({
    hello: 'vercel with light!',
  });
});
