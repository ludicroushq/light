import { Logger } from './logger';

export interface Config {
  root?: string;
  logs?: {
    logger?: Logger;
  };
}
