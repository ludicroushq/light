import { importLoggerConfig } from './utils/import-config';

const { logger: loggerFn } = importLoggerConfig();

export const logger = loggerFn || console;
