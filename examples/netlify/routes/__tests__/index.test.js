const { createTest } = require("light");
const request = require("supertest");

// const index = require('../index');
const { server } = createTest();

it("works with global values", async () => {
  const response = await request(server).get("/");
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({
    hello: "netlify!",
  });
});
