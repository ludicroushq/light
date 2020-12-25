---
id: context
title: Context
---

## Introduction

Context is just another name for the parameter available in middleware, plugins, and route methods. These are the available values.

- `req`: request
- `res`: response
- `params`: see [params](core/params.mdx) docs
- `query`: see [query](core/query.mdx) docs
- `buffer`: [micro](https://github.com/vercel/micro)'s buffer function
- `text`: [micro](https://github.com/vercel/micro)'s text function
- `json`: [micro](https://github.com/vercel/micro)'s json function
- `send`: [micro](https://github.com/vercel/micro)'s send function
- `sendError`: [micro](https://github.com/vercel/micro)'s sendError function
- `createError`: [micro](https://github.com/vercel/micro)'s createError function
