/* eslint-disable no-undef, import/prefer-default-export */
import { Middleware } from './route';

export interface LightConfig {
  root?: string;
}

export interface LoggerConfig {
  logger?: any;
  onRequest?: Middleware;
}
