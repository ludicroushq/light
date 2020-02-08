---
title: deploying to heroku
subtitle: deploy your application as a node server to heroku
---

# heroku

## Introduction

Heroku is an extremely popular web hosting platform that makes it as easy as a `git push` to deploy your code online. Light works well in Heroku with [server mode](https://github.com/ludicroushq/light/tree/207804d2e826e1f45ff0c63ba7b17f61c563bd82/guides/deployments/server/README.md) enabled and is lightning fast even with Heroku's cold boots on the free tier.

## Setup

This guide assumes that you have a heroku account set up and have already created a project on their website. Additionally, you need to have the Heroku CLI installed and logged in. If you have not already, follow the [getting started](https://github.com/ludicroushq/light/tree/207804d2e826e1f45ff0c63ba7b17f61c563bd82/guides/getting-started/README.md) guide to get your app up and running and initialize a git repository with `git init`.

Then add the following start script to your `package.json` so that Heroku knows how to start the production server.

```javascript
{
  // ...
  "scripts": {
    "start": "light start"
  }
  // ...
}
```

Then just commit, add your heroku project repo, and push!

```bash
git add .
git commit -m "initial commit"
heroku git:remote -a light-example
git push heroku master
```

Once you have pushed your code, Heroku will automatically detect that this is a `node`/`light` project and deploy it accordingly. You can see a working example at [light-example.herokuapp.com](https://light-example.herokuapp.com/). The source code is available on [GitHub](https://github.com/light-examples/heroku).

For additional information, check out the light CLI options with `light start -h` and visit the [Heroku documentation](https://devcenter.heroku.com/categories/nodejs-support) for environment and other configuration options.

