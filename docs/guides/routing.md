---
title: routing
subtitle: how to set up routing (for development and server deployment)
---

# routing

**Please note that routing is environment specific. The details documented below only apply to** [**server mode**](https://github.com/ludicrousxyz/light/tree/207804d2e826e1f45ff0c63ba7b17f61c563bd82/guides/server-vs-serverless/README.md#server) **since serverless environments will have their own custom routing**

## Introduction

Under the hood, light uses [find-my-way](https://github.com/delvedor/find-my-way) to route in server mode. find-my-way turned out to be one of the fastest routers available while allowing for advanced features such as hot module reloading. Reading the find-my-way documentation in conjunction with this guide may help you understand light's router better.

## Automatic Routing

When in server mode, if a `path` is not specified, light will try to guess the route based on its location in the directory. By default `routes/index.js` is treated as `/`, but other than that, it will use the system path. For example creating a file in `routes/posts/new.js` will yield the route `/posts/new` by default.

## Declarative Routing

You may also define a `routes.js` file in the parent directory of `routes` which defines which routes point to which files. Note that if a routes file is found then automatic routing will be completely disabled.

Routes supports all HTTP methods, as well as `namespace` as detailed below. Under the hood we use [find-my-way](https://github.com/delvedor/find-my-way) so you can use dynamic routing in the same way.

```javascript
const { router } = require('light');

const { route, routes } = router();

route.get('/', 'index');
route.get('/testing', 'index');

route.namespace('/api', (route) => {
  // creates a route which points http://localhost:3000/api/index to routes/api/index.js
  route.get('/index', 'api/index');
});

module.exports = routes;
```

## Params

If you want to handle urls with params such as `/posts/:id`, check out the [params guide](https://github.com/ludicrousxyz/light/tree/207804d2e826e1f45ff0c63ba7b17f61c563bd82/guides/params/README.md).

