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

Additionally, to support dynamic urls such as `/users/:username`, simply create a file called `[username].js` in the `users` folder. You can then use the `useParams` function to extract the username, [detailed here](params.md).

