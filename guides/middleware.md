---
title: middleware
subtitle: inject common middleware to share logic between routes
---

## Introduction

Middleware is code that is run before a route. It can add things onto the `req` and `res` objects to pass to the main handler or simply return the request early. The idea is very similar to how Express and Koa middleware work **but they are not compatible by default.**

## Usage

A middleware is an async function which accepts the `req`, and `res` objects.

```js
const { send } = require('light');

const checkAuth = async (req, res) => {
  if (!req.headers.authorization) {
    return send(401, 'please include authorization header');
  }
  return req.isAuthenticated = true;
}
```

To include middleware in your route, simply add it as a property array.

```js
const light = require('light');

module.exports = light({
  path: '/protected',
  middleware: [ checkAuth ], // you can have multiple middleware
  async handler(req) {
    return {
      isAuthenticated: req.isAuthenticated,
    };
  },
});
```

## Express and Koa Support

We are experimenting with adding wrappers to add partial support for Express and Koa! See this [GitHub issue](https://github.com/ludicrousxyz/light/issues/16) for more information.
