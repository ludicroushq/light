const { message, warn } = require('danger');
const listen = require('test-listen');
const fetch = require('node-fetch');
const http = require('http');
const { createServer } = require('light');
const fastify = require('./fastify');

const benchmark = async (url) => {
  for (let i = 0; i < 10000; i++) {
    const req = await fetch(url);
    const res = await req.json();
    if (res.hello !== 'world') {
      throw new Error('server did not respond properly');
    }
  }
};

const benchmarkExpress = async () => {
  const express = require('./express');
  const server = http.createServer(express);
  const url = await listen(server);

  const start = Date.now();
  await benchmark(url);
  const end = Date.now();

  server.close();
  return end - start;
};

const benchmarkKoa = async () => {
  const koa = require('./koa');
  const server = http.createServer(koa.callback());
  const url = await listen(server);

  const start = Date.now();
  await benchmark(url);
  const end = Date.now();

  server.close();
  return end - start;
};

const benchmarkFastify = async () => {
  const fastify = require('./fastify');
  await fastify.ready();
  const server = fastify.server;
  const url = await listen(server);

  const start = Date.now();
  await benchmark(url);
  const end = Date.now();

  server.close();
  return end - start;
};

const benchmarkLight = async () => {
  const server = createServer({ youch: false, requestLogger: false });
  const url = await listen(server.server);

  const start = Date.now();
  await benchmark(url);
  const end = Date.now();

  server.server.close();
  return end - start;
};

const run = async () => {
  console.log('Starting benchmarks');
  console.log('Benchmarking Express');
  const express = await benchmarkExpress();
  console.log('Benchmarking Koa');
  const koa = await benchmarkKoa();
  console.log('Benchmarking Fastify');
  const fastify = await benchmarkFastify();
  console.log('Benchmarking light');
  const light = await benchmarkLight();

  const getRPS = (ms) => {
    return Math.round(10000 / (ms / 1000));
  };

  const text = `
  ## Benchmark Results

  Makes 10,000 requests to each framework and times the result.

  | Framework | Total Time | Req/Sec |
  |-----------|------------|---------|
  | Express   |${express}ms|${getRPS(express)}|
  | Koa       |${koa}ms|${getRPS(koa)}|
  | Fastify   |${fastify}ms|${getRPS(fastify)}|
  | **Light** |**${light}ms**|**${getRPS(light)}**|
  `;

  if (Math.min(express, koa, fastify, light) === light) {
    message(text);
  } else {
    warn(text);
  }
};

run();
