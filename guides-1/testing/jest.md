---
title: jest
subtitle: use one of the most popular testing frameworks with light
---

# jest

## Introduction

Jest is now one of the most popular testing frameworks out there. Light has a built in `test` function that can be used to build and test individual routes very easily.

## Setup

First, create a test file for your route. As of right now the file cannot live inside of the `routes` folder as all files are automatically imported. Once your file is created, populate it with the following.

```javascript
const fetch = require('node-fetch');
const { test } = require('light');

const index = require('../routes/index');

let server;
beforeAll(async () => {
  server = await test(index);
})
afterAll(async () => {
  server.close();
});

describe('index', () => {
  it('responds with JSON', async () => {
    expect.assertions(2);
    const req = await fetch(server.url);
    const res = await req.json();
    expect(req.status).toStrictEqual(200);
    expect(res).toMatchObject({
      hello: 'world',
      this: 'is being tested by jest',
    });
  });
});
```

You will need the `node-fetch` dependency to actually make the requests to the server, but you may swap it out with any other similar library. The `test` function takes in a route and boots up a server, returning an object with a `url` property and a `close` function. The `beforeAll` and `afterAll` functions will boot up the server for the tests and if you need to reset the server between every test, you can change them to `beforeEach` and `afterEach`. Finally, inside the test you can do anything you will like with the `server.url`. Keep in mind that whatever route is passed becomes mapped to `/` and does not follow the routes defined in `routes.js`.

