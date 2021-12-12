export interface Logger {
  info: (message: any, context?: string) => void;
  error: (message: any, trace?: string, context?: string) => void;
  warn: (message: any, context?: string) => void;
  debug: (message: any, context?: string) => void;
}
