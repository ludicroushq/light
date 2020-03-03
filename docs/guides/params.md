---
title: params
subtitle: use the params function to fetch information from the url
---

# params

## Introduction

The params function is a helper function to help extract parameters from URLs. While most frameworks such as express extract this on your behalf, it needs to be done explicitly since each environment has different way of getting the URL and the normalization step needs to happen first. Additionally, most of the time you do not need to have this step done so it is better to only have it done when needed. Finally, light's principle is to not assume anything and so this step needs to be explicit.

**NOTE: some serverless providers \(such as Netlify\) do not support this feature as one file means one route.**

## Usage

The majority of the use cases for params is with dynamic routes. Here, we will take the following route as an example: `/users/:username`. Simply create a file in `routes/users/[username].js`.

{% code title="users/\[username\].js" %}
```javascript
const { createRoute, useParams } = require('light');

const { route } = createRoute('users');

module.exports = route(async (req, res) => {
  const { username } = await useParams('/users/:username', req.url);
  return {
    username,
  };
});
```
{% endcode %}

**Additionally, you need to configure your serverless's hosting provider to forward the routes correctly \(i.e. `/users/ludicrous` -&gt; `routes/users/[username].js`.** You don't need to do anything if you plan on hosting your application in server mode \(i.e Heroku or Docker\).

After starting the dev server, you can make a request to [localhost:3000/users/nahtnam](http://localhost:3000/users/nahtnam) and expect a response of

```javascript
{
  "id": "123",
}
```

Note that by default all url params are strings, and you will need to convert them as necessary. You can also chain on multiple params with a `/`. If you provide two params with the same name, the right most param will be resolved.

