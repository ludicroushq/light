---
id: hot-module-reloading
title: Hot Module Reloading (HMR)
---

## Introduction

Hot Module Reloading (HMR) is not a new concept for JavaScript! However, it is almost exclusively done in the front-end with React and Vue. Using similar techniques, we can finally update our server without having to restart the whole program (like in Ruby on Rails, Phoenix, etc).

## Why?

HMR is extremely useful when working with big programs. If you use tools like nodemon, anytime you make a change, your server will restart. This means that your server will re-connect to the database, re-connect to key-value stores, re-compile templates, and re-load every single route... This can take up to 3-5 seconds, every single time you make a change, so you will probably be very familiar with this page:

![connection refused](/img/hmr/connection-refused.png)

With HMR all of those problems will go away. Some times you will have restart manually but it is very rare.

## Dangers

The reason many avoid HMR in node is because it is known to cause memory leaks. But does it matter? Not really, for a few reasons. First, this is enabled exclusively in development so you will never have to worry about leaks in your production sever. Secondly, it will generally take a LOT of reloads before memory leaks become a issue in development so it is mostly okay. To stay on the safe side, simply restart your server every couple of hours

## Usage

Simply run `light dev` to start a server with HMR. Any time you change a file, it will be hot swapped.
