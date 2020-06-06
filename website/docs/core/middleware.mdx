---
id: middleware
title: Middleware
---

## Introduction

Light middleware is very similar to other kinds of middleware in node frameworks, however the api is slightly different. Middleware allow you to run code before your request to populate fields you will need later on. Good examples of middleware include authentication, cors, etc.

## Using a Middleware

You can add middleware to the route by using the `useMiddleware` function. A middleware is simply just another request handler method, similar to the ones you put in `get`, `post`, `all`, etc. The function is provided with a [context](core/context.md) and can either `send` or choose not to return anything. If the request is ended in the middleware, all following code will not execute.

A typical middleware looks like this.

import Embed from 'react-runkit';

<Embed mode="endpoint" source={`process.env.LIGHT_ENV = 'runkit';
const { createRoute } = require('light');\n
const { route, get, useMiddleware } = createRoute();\n
useMiddleware(({ req }) => {
  req.user = 'bob';
})\n
get(({ req }) => \`hello \${req.user}\`);\n
module.exports = route;`} />

## Short Circuit

A middleware can also choose to end the request early. A good example of this would be when the user is trying to access a protected resource without signing in.

<Embed mode="endpoint" source={`process.env.LIGHT_ENV = 'runkit';
const { createRoute } = require('light');\n
const { route, get, useMiddleware } = createRoute();\n
useMiddleware(({ req, res, send }) => {
  if (!req.headers.token) {
    return send(res, 401, 'please sign in!');
  }
  req.user = 'bob';
})\n
get(({ req }) => \`hello \${req.user}\`);\n
module.exports = route;`} />
