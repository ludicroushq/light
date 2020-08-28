import { importLoggerConfig } from './utils/import-config';

const { logger } = importLoggerConfig();

export default logger?.() || console;
