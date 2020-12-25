---
id: testing
title: Testing
---

## Introduction

Light comes with an easy way to test your routes that is compatible with ava, jest and other testing frameworks. Light exports a `createTest` function which generates a server for you containing all of the routes. You can then use that server to start and test it, or you can plug it into a library such as [`supertest`](https://github.com/visionmedia/supertest) to test it.

`createTest` returns an object with the keys `server` and `router` which you can use. The server is an HTTP server, and the `router` is a find-my-way route object which you can use to insert more routes if you need.

## Example

```js {4} title="index.test.js"
const supertest = require('supertest');
const { createTest } = require('light');

const { server } = createTest();

it('returns JSON', async () => {
  const result = await supertest(server).get('/');
  expect(result).toMatchObject({
    hello: 'world',
  });
});
```
