---
id: plugins
title: Plugins
---

## Introduction

TODO: coming soon

<Embed mode="endpoint" source={`process.env.LIGHT_ENV = 'runkit';
const { createRoute } = require('light');\n
const { route, get, useMiddleware, usePlugin } = createRoute();\n
useMiddleware(({ req }) => {
  console.log(req.url);
});\n
usePlugin((fn) => async (ctx) => {
  const before = Date.now();
  const result = await fn(ctx);
  const after = Date.now();
  console.log('request served in', after - before, 'ms');
  return result;
});\n
get(() => 'hello world!');\n
module.exports = route;`} />
