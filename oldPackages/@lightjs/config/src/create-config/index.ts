import { Config, Middleware, Logger } from '@lightjs/types';

export const createConfig = (defaultConfig?: Config) => {
  const config: Config = defaultConfig || {};

  const useLogger = (logger: Logger) => {
    config.logs = {
      logger,
    };
  };

  const useMiddleware = (middleware: Middleware) => {
    if (!config.middleware) {
      config.middleware = [];
    }
    config.middleware.push(middleware);
  };

  return { config, useLogger, useMiddleware };
};
