---
id: routing
title: Routing
---

## Introduction

**Please note that routing is environment specific. The details documented below only apply to [server mode](introduction/server-vs-serverless.md) since serverless environments will have their own custom routing**

## Introduction

Under the hood, light uses [find-my-way](https://github.com/delvedor/find-my-way) to route in server mode. find-my-way turned out to be one of the fastest routers available while allowing for advanced features such as hot module reloading. Reading the find-my-way documentation in conjunction with this guide may help you understand light's router better.

## Automatic Routing

When in server mode, light will try to guess the route based on its location in the directory. It is very similar to how [Next.js](https://nextjs.org/docs/routing/introduction) does its routing. Any file that ends with `index.js` will be collapsed to the root. So for example, the route `routes/index.js` will be treated as `/`. All other routes will follow the system path. For example creating a file in `routes/posts/new.js` will yield the route `/posts/new`.

Additionally, to support dynamic urls such as `/users/:username`, simply create a file called `[username].js` in the `users` folder. You can then use the `useParams` function to extract the username, [detailed here](core/params.md).

