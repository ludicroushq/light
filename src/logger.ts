import logger from './pino';

export default (message: any): void => {
  console.log('logger here with message', message)
  logger.logger.info(message)
  console.log('done', logger.logger.info)
  logger.logger.fatal('ADSD')
};
