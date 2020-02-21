---
title: error handling
subtitle: easily return errors from inside your endpoint
---

# error handling

## Introduction

Error handling is done mostly by throwing a new Error. Each route is wrapped with a try/catch block so that you can safely throw at any point. The reason throwing for errors is nice is because it allows you to escape from any point in your code!

## Usage

Simply import [`createError`](https://github.com/ludicrousxyz/light/tree/207804d2e826e1f45ff0c63ba7b17f61c563bd82/docs/boom/create-error/README.md) and throw it at any point. createError will create a boom error resulting in a pretty JSON output.

```javascript
const { createRoute, createError } = require('light');

const { route } = createRoute('error');

module.exports = route(() => {
  throw createError(401, 'sorry, you cannot access this route');
  return 'it will not get to me :(';
});
```

This will result in JSON which looks like this:

```javascript
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "sorry, you cannot access this route"
}
```

## Error Object

You can also throw a standard JavaScript `Error` object with a `message` and `statusCode` \(defaults to 500\).

```javascript
const err = new Error('Rate limit exceeded')
err.statusCode = 429
throw err
```

