const { useConfig, useLogger } = require('light');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
});

useLogger({
  logger: () => logger,
});

module.exports = useConfig({});
