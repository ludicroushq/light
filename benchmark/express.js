const express = require('express');

const app = express();

app.get('/', function (req, res) {
  res.status(200).json({ hello: 'world' });
});

module.exports = app;
