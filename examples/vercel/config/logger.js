const { createLogger } = require('light');
const pino = require('pino');

module.exports = createLogger({
  logger: () => pino(),
});
