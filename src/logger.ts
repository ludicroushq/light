import logger from './pino';

export default (message: any): void => {
  console.log('logger here with message', message);
  logger.info(message);
  console.log('done', logger.info);
  logger.fatal('ADSD');
};
