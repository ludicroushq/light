import { Middleware } from './createRoute';
import { Logger } from './logger';

type CustomUseLogger = () => Logger;

export interface Config {
  root?: string;
  middleware?: Middleware[];
  logger?: {
    useLogger: CustomUseLogger;
  };
}
