---
title: deploying to now
subtitle: easily deploy to zeit's now serverless platform
---

## Introduction

Now is a new serverless platform provided by ZEIT. Their aim is to make serverless deployments easy and hassle free. Fortunately light works well with Now to make it even easier!

Note that this guide targets their V2 platform and will not work with their older docker system (see [server](/guides/deployments/server) on how to use server mode)

## Usage

All data required to host on the now platform is stored in a `now.json` file.

```json
{
  "version": 2,
  "name": "my-light-project",
  "builds": [{ "src": "routes/**/*.js", "use": "@now/node" }],
  "routes": [
    { "src": "/", "dest": "routes/index.js" },
    { "src": "/(.*)", "dest": "routes/$1.js" }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

Once you save the file in the root folder, all you need to do is run the `now` command. If you have no already, see the [guides on how to install now-cli](https://zeit.co/docs/v2/getting-started/installation). See the [docs for now](https://zeit.co/docs/) to customize light and your deployment how you want.
