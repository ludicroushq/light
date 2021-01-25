import { Config, UseLoggerOptions } from '@lightjs/types';

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

  return { config, useLogger };
};
