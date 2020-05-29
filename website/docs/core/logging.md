---
id: logging
title: Logging
---

:::note
**It is highly recommend that you always use light's logger method over `console.log`**
:::

## Introduction

Logging is extremely important when it comes to building application as it lets you debug through your logs. Since the logging community in node is fragmented, light allow you to provide the logging function. By default it uses console but can be overridden in the `light.config.js` file like so.

```js {2-4} title="light.config.js"
module.exports = {
  logger() {
    return myCustomLogger;
  }
}
```

:::caution
Defining a custom logger does not work in all serverless environments. Currently it is verified working in Vercel if you use the config provided in the [vercel deployment guide](deploy/vercel.md).
:::

Everywhere else in your application you can use the logger by importing it from light.

import Embed from 'react-runkit';

<Embed mode="endpoint" source={`process.env.LIGHT_ENV = 'runkit';
const { createRoute, logger } = require('light');\n
const { route, get } = createRoute();\n
get(({ req }) => {
  logger.info(\`request made to \${req.url}\`);
  return 'hello world!';
});\n
module.exports = route;`} />
