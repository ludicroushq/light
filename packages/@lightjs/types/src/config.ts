import { Logger } from './logger';
import { Middleware } from './route';

export interface Config {
  root?: string;
  logs?: {
    logger?: Logger;
  };
  middleware?: Middleware[];
}
