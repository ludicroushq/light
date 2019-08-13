import logger from './pino';

export default (message: any): void => {
  logger.logger.info(message)
};
