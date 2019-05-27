---
title: getting started
subtitle: a quick guide on how to start with light
---

## Setup

### Prerequisites

- Node >= `8.0.0`
- NPM >= `8.0.0`

### Install

Install light

```bash
npm install light
```

and add the dev script to your `package.json`.

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

### Usage

Once you've installed light, all `.js` files under the `routes` folder will be used to serve pages.

To get started, populate `routes/index.js`.

```js
const light = require('light');

module.exports = light({
  path: '/',
  async handler() {
    return {
      hello: 'world',
    };
  },
});
```

Run `npm run dev` to start the development server. You should see an output in your terminal similar to the one below.

```txt
› start      🔥 igniting the server 🔥
› listening  on port 3000
› hmr        starting the hot reloader
› hmr        watching for changes
```

View your resulting website at [localhost:3000](http://localhost:3000)!

### Conclusion

That's it! You now have a dev server that

- hot swaps to speed up development routes
- supports many different serverless and hosting platforms
- has very little magic behind the scenes, what you see in a route is what you get

Feel free to continue with the guides in the sidebar to understand more of the framework!
