---
title: routing
subtitle: how to set up routing (for development and server deployment)
---

**Please note that routing is environment specific. The details documented below only apply to [server mode](/guides/server-vs-serverless#server) and serverless environment will have their own custom routing**

## Introduction

Under the hood, light uses [micro-http-router](https://github.com/protocol114/micro-http-router) to route in server mode. micro-http-router turned out to be one of the fastest routers available while allowing for advanced features such as hot module reloading. Reading the micro-http-router in conjunction with this guide may help you understand light's router better.

## Automatic Routing

When in server mode, if a `path` is not specified, light will try to guess the route based on its location in the directory. By default `routes/index.js` is treated as `/`, but other than that, it will use the system path. For example creating a file in `routes/posts/new.js` will yield the route `/posts/new` by default.

## Declarative Routing

When in server mode, you can define custom paths which will override the automatic routing.

```js
const light = require('light');

module.exports = light({
  path: '/posts/:id', // your route here
  async handler() {
    // ...
  },
});
```


You can also use route parameters such as the `:id` in the route above which become accessible in the req object as `req.params.id`.
