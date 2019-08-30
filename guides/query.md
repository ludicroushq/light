---
title: query
subtitle: use the query function to parse query parameters
---

## Introduction

The query function is just a helper function to help extract query parameters from URLs. It uses the WHATWG URL API under the hood to extract the query parameters and convert it from a [URLSearchParams](https://nodejs.org/api/url.html#url_class_urlsearchparams) to a JSON object.

If there are multiple query parameters with the same name, it will return an array instead of a string.

## Usage

Simply call the query function inside of your handler.

```javascript
const { light, Route } = require('light');

class Index extends Route {
  async handler() {
    const { id, name } = await this.query();

    return {
      id,
      name,
    };
  }
}

module.exports = light(Index);
```

After starting the dev server, you can make a request to [localhost:3000/?id=123&name=light](http://localhost:3000/?id=123&name=light) and expect a response of

```json
{
  "id": "123",
  "name": "light"
}
```

Note that by default all query parameters are strings, and you will need to cast them as necessary.

If you need to use the query function outside of the route such as a middleware or plugin, you can also call query on the route class directly.

```javascript
const { id, name } = await Route.query(someURL);
```
