---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

Getting started is quick and easy! This guide assumes you are running the latest LTS version of node.

## Install

Initialize a new repository with `npm init`. Then install light.

```bash
npm install light
```

Then add the following scripts to your `package.json`.

```json
{
  // ...
  "scripts": {
    "start": "light start",
    "dev": "light dev"
  }
  // ...
}
```

## Usage

Once you have installed light, all `.ts` and `.js` files under the `routes` directory will automatically be imported. Typescript will be automatically run/compiled if there is a `tsconfig.json` in the root directory or if `light.config.ts` exists. Additionally, all files that end in `.test.(t|j)s` and files in `__tests__` folders will be ignore.

To get started, lets populate `routes/index.js`. Please note we use [Next.js style routing](https://nextjs.org/docs/routing/introduction). You can check out the routing docs on the left for more information.

```js
const { createRoute } = require('light');
const { route, get } = createRoute();

get(() => {
  return {
    hello: 'world',
  };
});

module.exports = route;
```

This is probably different that what you are used to with `express`, `koa`, `hapi`, etc. There are a few interesting parts to this file. The `createRoute` function is the core of light and it returns an object containing `route`, `get`, `post`, `put`, `patch`, `delete`, and a bunch of other HTTP methods. For each route you can add whatever methods you like to support. Any methods you do not define will return `405 Method Not Allowed`. Additionally `createRoute` exports an `all` function which will respond to any HTTP method. At the bottom we export `route`. `route` is a function that is generated at the start of the server based on what environment the server is starting in. If the server is started with the CLI, it will generate a serverfull function, but if started in a serverless environment such as Vercel or AWS Lambda, the function will mutate to respond correctly!

Once you are done editing the file, run `npm run dev` to start the server with hot module reloading. If you did everything right, your terminal should output something similar to this.

```
[ start ] 🔥 igniting the server 🔥
[ listening ] on port 3000
[ hmr ] starting the hot reloader
[ hmr ] watching for changes
```

## Conclusion

Phew, that was a lot. Don't worry though, you just learnt about 80% of light! It's really that simple. You now have a dev server that

- hot swaps any code you change without restarting the server
- supports many different serverless and hosting platforms
- has very little magic behind the scenes, what you see in a route is what you get

Feel free to continue with the guides in the sidebar to understand more of the framework!