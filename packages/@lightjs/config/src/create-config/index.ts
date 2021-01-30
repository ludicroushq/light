import { Config, Middleware, UseLoggerOptions } from '@lightjs/types';

export const createConfig = (defaultConfig?: Config) => {
  const config: Config = defaultConfig || {};

  const useLogger = ({ logger: newLoggerFn }: UseLoggerOptions = {}) => {
    if (newLoggerFn) {
      const newLogger = newLoggerFn();
      config.logs = {
        logger: newLogger,
      };
    }
  };

  const useMiddleware = (middleware: Middleware) => {
    if (!config.middleware) {
      config.middleware = [];
    }
    config.middleware.push(middleware);
  };

  return { config, useLogger, useMiddleware };
};
