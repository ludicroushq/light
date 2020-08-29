import { Middleware } from './types/route';
import { LoggerConfig } from './types/config';

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
