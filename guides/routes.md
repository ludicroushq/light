---
title: routes
subtitle: the main entry point for your endpoints
---

## Introduction

Every light route must export the `handler` function with a callback function inside (which can be an async function) which is responsible for handling request. The handler will receive have access to `req` (IncomingMessage) and `res` (ServerResponse) as parameters (these may vary between different environments).

## Req/Res

The `req` and `res` variables are standard IncomingMessage and ServerResponse objects. In some environments, properties may be added or missing. For example, in AWS/Netlify mode, the `req` object will be missing some request and response properties because they were casted from `event` and `context`. You should only use properties that you know are going to be available in your production environment.

## Return

If you choose to `return` from the function (instead of `send`ing), you must return a valid response. Whatever value that is returned will be serialized and sent as a response. You can choose to return JSON, String, or any other type that [micro](https://github.com/zeit/micro) supports under the hood.

```js
const { route } = require('light');

const { handler } = route();

module.exports = handler(async (req, res) => {
  // req and res variables are available here

  return {
    hello: 'world',
  };
  // or
  return 'hello world';
});
```

## Send

Additionally you may use `micro`'s send function to return different kinds of responses. The send function can be imported from light and used anywhere in the handler. See [micro's documentation](https://github.com/zeit/micro#sendres-statuscode-data--null) for more details.

```js
const { route, send } = require('light');

const { handler } = route();

module.exports = handler(async (req, res) => {
  send(res, 200, { hello: 'world' });
});
```
