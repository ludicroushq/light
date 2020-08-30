const { message } = require('danger');
const listen = require('test-listen');
const fetch = require('node-fetch');
const http = require('http');
const { createServer } = require('light');

const benchmark = async (url) => {
  for (let i = 0; i < 1000; i++) {
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
  console.log('Benchmarking light');
  const light = await benchmarkLight();
  message(`
  ### Benchmark Results

  Express took **${express}ms** to respond to 1k requests

  Koa took **${koa}ms** to respond to 1k requests

  Light took **${light}ms** to respond to 1k requests
  `);
};

run();
