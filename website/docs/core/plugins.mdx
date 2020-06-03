---
id: plugins
title: Plugins
---

## Introduction

The idea of plugins comes from [Micro](https://github.com/vercel/micro), however light uses a slightly different API. Plugins allow you to wrap a request completely and run code, before the request, after the request, and also mutate the response. It is similar to Higher Order Components (HOCs) in React.

## Using a Plugin

You can add plugins to the route by using the `usePlugin` function. A plugin is a function that takes in a fn and returns another function that takes in a [context](core/context.md) and a valid response.

While that is the official definition of a light plugin, it is quite confusing so lets break it down:

1. usePlugin should be called with a plugin
2. The parameter sent to the plugin is a function (called `fn`). `fn` is the actual route handler that is defined in the http method functions. In the majority of cases, you will want to await `fn` in the following step to get the intended response and then mutate if you so choose.
3. The plugin should return a function that takes in a context and returns a response. You will want to use the previous `fn` that was provided to get the intended response and mutate if you so choose.
4. **Make sure to either return a value at the end of your plugin or end the request with `send`.**

Here is an example with a basic logging plugin.

import Embed from 'react-runkit';

<Embed mode="endpoint" source={`process.env.LIGHT_ENV = 'runkit';
const { createRoute } = require('light');\n
const { route, get, usePlugin } = createRoute();\n
usePlugin((fn) => async (ctx) => {
  const before = Date.now();
  const result = await fn(ctx);
  const after = Date.now();
  console.log('request served in', after - before, 'ms');
  return result;
});\n
get(() => 'hello world!');\n
module.exports = route;`} />
