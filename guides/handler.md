---
title: handler
subtitle: the main handler function for your endpoints
---

## Introduction

Every light route must have a `handler` function (which can be an async function) which is responsible for handling request. The handler will receive `req` (IncomingMessage) and `res` (ServerResponse) variables as the parameters (these may vary between different environments).

## Req/Res

The `req` and `res` variables are standard IncomingMessage and ServerResponse objects. In some environments, properties may be added or missing. For example, in server mode, the `req` object will contain and additional `searchParams` property which is available to use. You should only use such properties if you know it is going to be available in production.

## Return

If you choose to `return` from the function, you must return a valid response. Whatever value that is returned will be serialize and sent as a response. You can choose to return JSON, String, or any other type that [micro](https://github.com/zeit/micro) supports under the hood.

```js
const light = require('light');

module.exports = light({
  path: '/',
  async handler(req, res) {
    // req and res variables are available here
    return {
      hello: 'world',
    };
    // or
    return 'hello world';
  },
});
```

## Send

Additionally you may use `micro`'s send function to return different kinds of responses. The send function can be imported from light and used anywhere in the handler. See [micro's documentation](https://github.com/zeit/micro#sendres-statuscode-data--null) for more details.

```js
const { light, send } = require('light');

module.exports = light({
  path: '/',
  async handler(req, res) {
    send(res, 200, { hello: 'world' });
  },
});
```
