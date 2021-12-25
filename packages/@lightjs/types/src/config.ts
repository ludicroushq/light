import { Middleware } from './createRoute';
import { Logger } from './logger';

type UseLogger = () => Logger;
type InternalLogger = () => {
  info(message: string): void;
};

export interface Config {
  root?: string;
  middleware?: Middleware[];
  logger?: {
    useLogger: UseLogger;
    internalLogger: InternalLogger;
  };
}
