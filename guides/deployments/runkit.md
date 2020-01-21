---
title: deploying to runkit
subtitle: easily prototype your application using runkit's endpoints
---

# runkit

## Introduction

RunKit is a fun and dynamic website which lets you prototype your applications. With their support for [endpoints](https://runkit.com/docs/endpoint) and light's flexibility, you can easily run the framework on RunKit.

## Usage

Simply create a new notebook and add the following code.

```javascript
const { route } = require('light');

process.env.LIGHT_ENV = 'runkit';

const { handler } = route();

module.exports = handler(() => {
  return {
    hello: 'world',
  };
});
```

Then click the "run" button. It should print `Object {endpoint: function()}`. If you get that, then you are all set. Press the little "endpoint" button underneath the notebook title to see your project live.

A demo of this functionality can be seen on the [home page](../../).

