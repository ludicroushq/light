import { Logger } from '@lightjs/types';
import { importLightConfig } from '@lightjs/config';

export function useLogger(): Logger {
  const config = importLightConfig();

  if (config.logger?.createLogger) {
    return config.logger.createLogger();
  }

  return console;
}
