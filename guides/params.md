---
title: Params
subtitle: use the params function to fetch information from the url
---

## Introduction

The params function is a helper function to help extract parameters from URLs. While most frameworks such as express extract this on your behalf, it needs to be done explicitly since each environment has different way of getting the URL and the normalization step needs to happen first. Additionally, most of the time you do not need to have this step done so it is better to only have it done when needed. Finally, light's principle is to not assume anything and so this step needs to be explicit.

**NOTE: some serverless providers (such as Netlify) do not support this feature.**

## Setup

For development purposes, you should define the route params defined in the [find-my-way](https://github.com/delvedor/find-my-way) documentation.

```javascript
const { light } = require('light');

module.exports = light({
  path: '/posts/:id',

  // ...
});
```

**Additionally, you need to configure your serverless's hosting provider to forward the routes correctly (i.e. `/posts/123` -> `routes/posts.js`.** You don't need to do anything if you plan on hosting your application in server mode (i.e Heroku or Docker).

## Usage

Simply import the `params` function and pass it the `path` string (the template) and the current `url` (the string containing the value).

```javascript
const { light, params } = require('light');

module.exports = light({
  path: '/posts/:id',

  async handler(req) {
    const { id } = await params(this.path, req.url);

    return {
      id,
    };
  },
});
```

After starting the dev server, you can make a request to [localhost:3000/posts/123](http://localhost:3000/posts/123) and expect a response of

```json
{
  "id": "123",
}
```

Note that by default all url params are strings, and you will need to convert them as necessary. You can also chain on multiple params with a `/`. If you provide two params with the same name, the right most param will be resolved.
