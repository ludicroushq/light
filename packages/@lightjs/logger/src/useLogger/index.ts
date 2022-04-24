import { Logger } from '@lightjs/types';
import { importLoggerConfig } from '@lightjs/config';

export function useLogger(): Logger {
  const config = importLoggerConfig();

  if (!config) {
    return console;
  }

  return config();
}
