---
title: global
subtitle: use the global function to share global values such as a logger
---

# global

## Introduction

The global function is a way to share global values such as a logger, metrics, or even middleware and access them in all of your files without having to manually import them.

**This feature does not work in serverless mode!**

## Usage

Simply create a `light.config.js` file in the ROOT of your project \(i.e. on the same level as the routes folder\)

```javascript
module.exports = {
  global: {
    this: 'is global',
  },
};
```

**If you are using `light dev` or `light server`, the global variables get injected into the server under the `light` variable.** This is controversial because many people are against global variables and they are right, BUT if you do atomic actions such as logging or incrementing a counter, it shouldn't really matter.

```javascript
const { createRoute } = require('light');

const { route } = createRoute('global');

module.exports = route(() => {
  light.logger.log('hello world!'); // no need to import anything
  return {
    hello: 'world',
  };
});
```

**If you are using a serverless environment, you will have to manually call the global function.** In any of your routes, just invoke the global function.

```javascript
const { createRoute, global } = require('light');

const { logger } = useGlobal();
const { route } = createRoute('global');

module.exports = route(() => {
  logger.log('hello world!');
  return {
    hello: 'world',
  };
});
```

