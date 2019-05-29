---
title: deploying to netlify
subtitle: deploy your application alongside your frontend with netlify functions
---

## Introduction

Netlify is an extremely popular static website host, following the JAM stack principle. While their main focus is to build and host static content, they have released a lambda service called functions which allows you to run endpoints that has the same signature as AWS Lambda functions. The benefit of using Netlify is having quick and automatic deployments which propagate through Netlify's CDN all triggered with a simple `git push`.

## Setup

This guide assumes that you have already set up a Netlify account, and a GitHub repository.

Before you can deploy, you must first populate your git repository. Follow the [getting started](/guides/getting-started) guide to build you initial app, and verify everything is working with `npm run dev`. Once you have that set up, add a `netlify.toml` file that contains the path to the routes directory.

```toml
[build]
  command = "npm install"
  functions = "routes"
```

That's all you need in terms of code! Now head over to Netlify's website and click the "New Site From Git" button. Follow the steps to connect your GitHub account to Netlify and add your GitHub repo. Once you get to the final step, just leave the pre-filled data as is and press deploy. **This will deploy successfully, BUT your endpoints will not work.** Why is that? Well, light does not know which environment it neeeds to transform to. To set this up, open the settings page (on the top), go to the "Build and Deploy" section in the sidebar, and click "Environments" in the sidebar. Click "Edit Variables", and add a new environment variable which sets `LIGHT_ENVIRONMENT` to `netlify`. The end result should look like this.

![environment settings in netlify](/static/images/screenshots/netlify/environment.png)

Press save to save your changes. Finally, to update your function to use this environment variable, you must go to the "Deploys" page at the top, and press "Trigger Deploy", and "Deploy Site".

![trigger deploy](/static/images/screenshots/netlify/trigger-deploy.png)

That's it! Your functions will now be deployed and ready to use. To see an example of a hosted endpoint, visit [light-example.netlify.com/.netlify/functions/index](https://light-example.netlify.com/.netlify/functions/index). The source code is available on [GitHub](https://github.com/light-examples/netlify).

**NOTE**: Netlify uses the file system as the router, so you will not be able to define custom paths with the `path` flag, and routes such as `index` will not be mapped to `/`.
