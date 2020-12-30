export interface Logger extends Console {}

export interface UseLoggerOptions {
  logger?: () => Logger;
}
