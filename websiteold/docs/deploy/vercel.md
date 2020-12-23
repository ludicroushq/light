---
id: vercel
title: Vercel Now
---

## Introduction

Now is a new serverless platform provided by Vercel. Their aim is to make serverless deployments easy and hassle free. Fortunately light works well with Now with a little bit of configuration!

## Setup

All data required to configure the Now platform is stored in a `now.json` file.

```javascript
{
  "version": 2,
  "name": "my-light-project",
  "builds": [{ "src": "routes/**/*.js", "use": "@now/node" }],
  "routes": [
    { "src": "/", "dest": "routes/index.js" },
    { "src": "/(.*)", "dest": "routes/$1.js" }
  ],
  "env": {
    "NODE_ENV": "production",
    "LIGHT_ENV": "now"
  }
}
```

Once you save the file in the root folder, all you need to do is configure your git repository to deploy. If you have not already, see the [guides on how to set that up](https://vercel.com/docs/v2/introduction). See the [docs for serverless functions](https://vercel.com/docs/v2/serverless-functions/introduction) to see more information on how it works.

**NOTE**: The `routes` configuration provided above is very basic. You will need to configure it to account for all of your routes
