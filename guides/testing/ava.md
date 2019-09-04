---
title: ava
subtitle: use ava, a fast and async testing framework with light
---

## Introduction

Ava is an incredibly fast and asynchronous testing framework. Light has a built in `test` function that can be used to build and test individual routes very easily.

## Setup

First, create a test file for your route. As of right now the file cannot live inside of the `routes` folder as all files are automatically imported. Once your file is created, populate it with the following.

```javascript
const test = require('ava')
const fetch = require('node-fetch');
const light = require('light');

const index = require('../routes/index');

let server;
test.before(async () => {
  server = await light.test(index);
})
test.after(async () => {
  server.close();
});

test('index responds with JSON', async t => {
  const req = await fetch(server.url);
  const res = await req.json();
  t.is(req.status, 200);
  t.deepEqual(res, {
    hello: 'world',
    this: 'is being tested by ava',
  });
});
```

You will need the `node-fetch` dependency to actually make the requests to the server, but you may swap it out with any other similar library. The `test` function takes in a route and boots up a server, returning an object with a `url` property and a `close` function. The `before` and `after` functions will boot up the server for the tests. Finally, inside the test you can do anything you will like with the `server.url`. Keep in mind that whatever route is passed becomes mapped to `/` and does not follow the routes defined in `routes.js`. Additionally, destructuring `test` from the `light` variable will not work.
