---
title: methods
subtitle: respond to custom methods when in server mode
---

**Please note that methods are environment specific. The details documented below only apply to [server mode](/guides/server-vs-serverless#server) since serverless environment will have their own method handling**

## THIS DOC IS INCOMPLETE. IT WILL BE UPDATED WHEN ROUTING IS UPDATED

## Introduction

Under the hood, light uses [find-my-way](https://github.com/delvedor/find-my-way) to route in server mode. find-my-way supports the following HTTP methods:

- `get`
- `delete`
- `head`
- `patch`
- `post`
- `put`
- `options`
- `all`

**NOTE: Each serverless provider will have a different way to handle route method, but most just default to `all` for all routes.**

## Usage

When in server mode, you can define a custom method.

```js
const light = require('light');

module.exports = light({
  path: '/',
  method: 'get', // your method here
  async handler() {
    // ...
  },
});
```

Additionally, you can provide an array if you want to support multiple methods.

```js
{
  // ...
  method: ['get', 'post', 'options'], // your methods here
  // ...
};
```
