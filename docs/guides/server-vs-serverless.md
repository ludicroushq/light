---
title: server vs serverless
subtitle: the differences and pros/cons between the two
---

# server-vs-serverless

## Introduction

You've probably heard of both of these terms, but what exactly do they mean? And why would I use one over the other? The point of this guide isn't to convince you to use one or the other but just to help you pick. Light supports both methods really well and has been battle tested in both environments.

## Server

This is your typical server. You can spawn as many of these as you want, on as many servers as you want and load balance them. You can package these in docker containers and deploy them into a Kubernetes cluster. It is the de-facto way host your applications and allows for very fine grained control over your deployments.

However, all of this comes with an overhead. You need to either learn dev-ops yourself or hire someone to do it for you. You also need to purchase servers around the world and worry about proxying requests properly.

Running light in server mode works just as you would expect. A quick `light start` or `npm start` is all you need to boot up your HTTP server. You can also pass in addition configuration options as you need.

Additionally, there are more features that you have and also are missing in server mode.

| Pros | Cons |
| :--- | :--- |
| Control over deployments | Expensive |
| Scale at your own pace | Manage all scaling yourself |
| Web-sockets support | No fault tolerance \(by default\) |
| Generally faster |  |

## Serverless

**NOTE: In development, you will have to use server mode to start a server and test your endpoints, but you can deploy to serverless environments with absolutely no changes to your code!**

Serverless is a new term that many companies such as Zeit and AWS are pushing. The main selling point is to fix some of the cons of regular servers. As your website becomes more and more popular, you will have to worry more and more about making sure your application is available. Serverless aims to fix that by having endpoints be simple "functions". When you deploy your functions to any of the providers, your simple functions are propagated throughout the provider's network and highly available. Because of this, you don't have to worry about scaling or load balancing. All of it is done by the hosting provider.

Some of the downsides include no websocket support, per execution costs \(which may be very expensive if you handle millions of requests\), and cold starts. Due to the sheer number of functions websites like AWS store, your function will be "cold" most of the time, and when a request is made, there is additional overhead involved in fetching the function from a datastore and running it. This can result in anywhere from 10ms-500ms of additional overhead. In addition, when you are using databases, every time your function is run, it has to reconnect to the external database.

The point of light is to allow you to write code that works in both environments. That way you do not have to worry about switching around when required. If one day you can't handle the number of requests you are getting, you can switch to serverless in just minutes instead of days. Or if one day Serverless is becomes too expensive, you can spin up your own servers in minutes instead of days.

Serverless has its own benefits and drawbacks and you should only use it if it is right for your application.

| Pros | Cons |
| :--- | :--- |
| Generally cheaper | Cold starts will result in slow responses |
| Instant scaling | No control over deployments |
| Fault tolerant \(one crash has no affect\) | No web-sockets support |

## Why Should I Use Light Instead of the Serverless Framework

Good question. The serverless framework is much more robust and feature packed, but sometimes you don't need that. The promise of light is to be **light**weight, easy to work with, \(almost\) zero configuration, and be developer friendly. If you need the robustness that the serverless framework provides, please use that instead. The purpose behind light was to build a framework that works in any environment so you don't have to worry about dev-ops. As a result the routes are explicit and simple.

