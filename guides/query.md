---
title: query
subtitle: use the query function to parse query parameters
---

# query

## Introduction

The query function is just a helper function to help extract query parameters from URLs. It uses the WHATWG URL API under the hood to extract the query parameters and convert it from a [URLSearchParams](https://nodejs.org/api/url.html#url_class_urlsearchparams) to a JSON object.

If there are multiple query parameters with the same name, it will return an array instead of a string.

## Usage

Simply call the query function inside of your handler.

```javascript
const { route, query } = require('light');

const { handler } = route();

module.exports = handler(((req, res) => {
  const { id, name } = await query(req.url);

  return {
    id,
    name,
  };
});
```

After starting the dev server, you can make a request to [localhost:3000/?id=123&name=light](http://localhost:3000/?id=123&name=light) and expect a response of

```javascript
{
  "id": "123",
  "name": "light"
}
```

Note that by default all query parameters are strings, and you will need to cast them as necessary.

