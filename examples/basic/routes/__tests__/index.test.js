const { createTest } = require('light');
const request = require('supertest');

// notice how we are just importing the one route and running the test on it?
// routes created with `createRoute` are nothing more than functions
// USE THIS METHOD IF THE APP IS SIMPLE
const index = require('../index');
it('works with a singular import', async (done) => {
  expect.assertions(2);
  const response = await request(index).get('/');
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({
    hello: 'world',
  });
  done();
});

const { server } = createTest();
// using the createTest will start the entire server
// USE THIS METHOD IF THE APP IS COMPLEX
it('works with the server', async (done) => {
  expect.assertions(2);
  const response = await request(server).get('/');
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({
    hello: 'world',
  });
  done();
});
