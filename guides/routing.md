---
title: routing
subtitle: how to set up routing (for development and server deployment)
---

**Please note that routing is environment specific. The details documented below only apply to [server mode](/guides/server-vs-serverless#server) since serverless environments will have their own custom routing**

## Introduction

Under the hood, light uses [find-my-way](https://github.com/delvedor/find-my-way) to route in server mode. find-my-way turned out to be one of the fastest routers available while allowing for advanced features such as hot module reloading. Reading the find-my-way documentation in conjunction with this guide may help you understand light's router better.

## Automatic Routing

When in server mode, if a `path` is not specified, light will try to guess the route based on its location in the directory. By default `routes/index.js` is treated as `/`, but other than that, it will use the system path. For example creating a file in `routes/posts/new.js` will yield the route `/posts/new` by default.

## Declarative Routing

When in server mode, you can define custom paths which will override the automatic routing.

```js
const light = require('light');

module.exports = light({
  path: '/posts', // your route here
  async handler() {
    // ...
  },
});
```

## Params

If you want to handle urls with params such as `/posts/:id`, check out the [params guide](/guides/params).
