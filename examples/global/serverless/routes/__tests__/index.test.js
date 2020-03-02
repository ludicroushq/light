const { createTest } = require('light');
const request = require('supertest');

const { server } = createTest();
it('works with global middleware and plugin', async (done) => {
  console.log = jest.fn();
  expect.assertions(5);
  const response = await request(server).get('/');
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({
    hello: 'world',
  });
  // ensure the middleware and plugins work
  expect(console.log.mock.calls[0][0]).toBe('before');
  expect(console.log.mock.calls[1][0]).toBe('hello world');
  expect(console.log.mock.calls[2][0]).toBe('after');
  done();
});
