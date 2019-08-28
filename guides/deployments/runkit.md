---
title: deploying to runkit
subtitle: easily prototype your application using runkit's endpoints
---

## Introduction

RunKit is a fun and dynamic website which lets you prototype your applications. With their support for [endpoints](https://runkit.com/docs/endpoint) and light's flexibility, you can easily run the framework on RunKit.

## Usage

Simply create a new notebook and add the following code.

```js
const { light, Route } = require('light');

process.env.LIGHT_ENV = 'runkit';

class Index extends Route {
  async handler() {
    return {
      hello: 'world',
    };
  }
}

module.exports = light(Index);
```

Then click the "run" button. It should print `Object {endpoint: function()}`. If you get that, then you are all set. Press the little "endpoint" button underneath the notebook title to see your project live.

A demo of this functionality can be seen on the [home page](/).
