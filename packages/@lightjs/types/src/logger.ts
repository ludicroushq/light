type LoggerFunction = (...message: any[]) => void;
export interface Logger {
  info: LoggerFunction;
  error: LoggerFunction;
  warn: LoggerFunction;
  debug: LoggerFunction;
}

export interface UseLoggerOptions {
  logger?: () => Logger;
}
