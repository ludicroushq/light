---
title: plugins
subtitle: wrap your entire application with explicit plugins
---

# plugins

## Introduction

Plugins are a concept that aren't really used in Express or other mainstream frameworks. They resemble [Next.js's plugins](https://nextjs.org/docs#customizing-webpack-config) and are due to the way micro works.

While middleware run one after another, plugins are given the function and can choose if and when to run the code. You can think of it like the `next` function in Express or Koa but composed in a much clearer and functional way.

## Example

Plugins are given a `fn` and must return an async function which take in `req`, and `res` objects and return from the request. One example use case can be logging where you need data both before and after.

```javascript
const logger = fn => async (req, res) => {
  console.log('Request to', req.url);
  const start = Date.now();
  const response = await fn(req, res);
  console.log('Server responded in', Date.now() - start , 'ms');
  return response;
};
```

As you can see, unlike middleware, with plugins we can run code both before and after the request. To propagate the response properly, it is best to store and return the response of `fn` at the end of the plugin.

Finally, we simply list the logger as plugin in the route.

```javascript
const { createRoute } = require('light');
const { route, addPlugin } = createRoute('plugins');

addPlugin(logger);

module.exports = route(() => {
  return {
    hello: 'world',
  };
}));
```

