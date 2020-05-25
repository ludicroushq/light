import pretty from 'pretty-time';
import { v4 as uuidv4 } from 'uuid';
import chalk from 'chalk';

import importConfig from '../utils/import-config';

const getStatusCode = (s: number): string => {
  const str = s.toString();
  if (s >= 200 && s < 300) {
    return chalk.green(str);
  }

  if (s >= 400 && s < 500) {
    return chalk.yellow(str);
  }

  if (s >= 500 && s < 600) {
    return chalk.red(str);
  }

  return chalk.white(str);
};

const defaultRequestLogger = (fn: any): any => async (req: Request, res: Response): Promise<any> => {
  const requestID = uuidv4().substring(0, 8);
  const time = (new Date()).toLocaleTimeString();
  console.info(`[ ${chalk.gray(requestID)} ] > ${chalk.cyanBright(req.method)} ${chalk.whiteBright(req.url)}${chalk.gray(`, at ${time}`)}`);
  const before = process.hrtime();
  const response = await fn(req, res);
  const after = process.hrtime(before);
  console.info(`[ ${chalk.gray(requestID)} ] < ${getStatusCode((res as any).statusCode)}${chalk.gray(`, in ${pretty(after)}`)}`);
  return response;
};

const { requestLogger } = importConfig();

export default requestLogger?.() || defaultRequestLogger;
