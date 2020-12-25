---
id: server
title: Server
---

## Introduction

Running your application in server mode will give you many benefits such as packaging the application into a docker container, or making use of websockets. Running your light app in server mode will cause it to work exactly in dev mode except for the pretty error handling, and [HMR](core/hot-module-reloading.md).

## Setup

Simply add the `light start` command to your package.json

```javascript
{
  // ...
  "scripts": {
    "start": "light start"
  }
  // ...
}
```

## Usage

You can see the options that light provides by running `light start -h`.
