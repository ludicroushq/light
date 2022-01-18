import { Middleware } from './createRoute';
import { Logger } from './logger';

type CreateLogger = () => Logger;
type FrameworkLogger = () => {
  info(message: string): void;
};

export interface Config {
  root?: string;
  middleware?: Middleware[];
  logger?: {
    createLogger: CreateLogger;
    createFrameworkLogger: FrameworkLogger;
  };
}
