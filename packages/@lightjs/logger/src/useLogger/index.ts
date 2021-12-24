import { Logger } from '@lightjs/types';
import { importLightConfig } from '@lightjs/config';

export function useLogger(): Logger {
  const config = importLightConfig();

  if (config.logger?.useLogger) {
    return config.logger.useLogger();
  }

  return console;
}
