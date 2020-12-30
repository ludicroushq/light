import { UseLoggerOptions, Logger } from '@lightjs/types';

const createLogger = () => {
  let logger: Logger = { ...console };
  const useLogger = ({ logger: newLoggerFn }: UseLoggerOptions = {}) => {
    if (newLoggerFn) {
      const newLogger = newLoggerFn();
      // We can't just redefine the `logger` variable since it will not propagate
      // Instead we should update the Object. This is not foolproof but it should work
      Object.keys(newLogger).forEach((key) => {
        const loggerKey = key as keyof Logger;
        logger[loggerKey] = newLogger[key as keyof Logger];
      });
    }
  };
  return { logger, useLogger };
};

const { logger, useLogger } = createLogger();

export { logger, useLogger };
