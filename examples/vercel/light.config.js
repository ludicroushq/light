const { createConfig } = require('light');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

function createLogger() {
  return logger
}


module.exports = createConfig({
  logger: {
    createLogger,
    createFrameworkLogger: createLogger,
  }
})
