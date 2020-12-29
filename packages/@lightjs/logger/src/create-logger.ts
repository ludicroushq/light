import { Middleware, LoggerConfig } from '@lightjs/types';

type CreateLogger = {
  logger?: () => any;
  onRequest?: (logger: any) => Middleware;
};

export const createLogger = ({
  logger: loggerInput,
  onRequest: onRequestInput,
}: CreateLogger): LoggerConfig => {
  const logger = loggerInput?.();
  const onRequest = onRequestInput?.(logger);
  return {
    logger,
    onRequest,
  };
};
