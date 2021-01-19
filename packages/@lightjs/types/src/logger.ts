export interface Logger {
  info: Function;
  error: Function;
  warn: Function;
  debug: Function;
}

export interface UseLoggerOptions {
  logger?: () => Logger;
}
