---
title: global
subtitle: use the global function to share global values such as a logger
---

## Introduction

The global function is a way to share global values such as a logger, metrics, or even middleware and access them in all of your files without having to manually import them.

**This feature does not work in serverless mode!**

## Usage

Simply create a `light.config.js` file in the ROOT of your project. Light will search the `process.cwd()` and all parent folders, so make sure the file is somewhere along that path.

```javascript
module.exports = {
  global: {
    this: 'is global',
  },
};
```

In any of your routes, just invoke the global function.

```javascript
const { route, global } = require('light');

const { logger } = global();
const { handler } = route();

module.exports = handler(() => {
  logger.log('hello world!');
  return {
    hello: 'world',
  };
});

```
