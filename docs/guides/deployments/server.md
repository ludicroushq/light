---
title: deploying to a server
subtitle: deploy your application as a normal node server
---

# server

## Introduction

Running your application in server mode will give you many benefits such as packaging the application into a docker container, and making use of websockets. Since this is an integral requirement of light, it is very simple to start your own server. This guide assumes that an application has already been built using the [getting started](https://github.com/ludicroushq/light/tree/207804d2e826e1f45ff0c63ba7b17f61c563bd82/guides/getting-started/README.md) guides.

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

