---
title: error handling
subtitle: easily return errors from inside your endpoint
---

## Introduction

Error handling is done mostly by throwing a new Error. Each route is wrapped with a try/catch block so that you can safely throw at any point. The reason throwing for errors is nice is because it allows you to escape from any point in your code!

## Usage

Simply import [`createError`](/docs/boom/create-error) and throw it at any point. createError will create a boom error resulting in a pretty JSON output.

```js
const { light, createError } = require('light');

module.exports = light({
  path: '/',
  async handler(req, res) {
    throw createError(401, 'sorry, you cannot access this route');
    return {
      hello: 'world',
    };
  },
});
```

This will result in JSON which looks like this:

```json
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "sorry, you cannot access this route"
}
```

## Error Object

You can also throw a standard JavaScript `Error` object with a `message` and `statusCode` (defaults to 500).

```js
const err = new Error('Rate limit exceeded')
err.statusCode = 429
throw err
```
