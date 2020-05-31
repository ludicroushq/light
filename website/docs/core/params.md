---
id: params
title: Params
---

:::caution
If you are using a serverless environment, you must configure it manually to route to the correct file when deployed
:::

## Introduction

Params allow you to dynamically serve routes. To set up routing in server mode (for development), check out the [routing](core/routing.md) guide. A `useParams` function is passed as part of the context and can be used to extract the params out of the url. You must provide it with a template string, such as `/users/:username`. So in this example, if the url is `/users/bob` then the function returns an object with username set to bob.

import Embed from 'react-runkit';

<Embed mode="endpoint" source={`process.env.LIGHT_ENV = 'runkit';
const { createRoute } = require('light');\n
const { route, get } = createRoute();\n
get(({ req, useParams }) => {
  if (!req.url.startsWith('/users')) return 'please visit /users/:username';\n
  const { username } = useParams('/users/:username');
  return \`hello \${username}\`;
});\n
module.exports = route;`} />
