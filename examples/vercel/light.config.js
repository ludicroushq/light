const { createConfig } = require('light');
const winston = require('winston');

const { config, useLogger } = createConfig();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

useLogger(logger)

module.exports = config;
