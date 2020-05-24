import importConfig from './utils/import-config';

const { logger } = importConfig();

export default logger || console;
