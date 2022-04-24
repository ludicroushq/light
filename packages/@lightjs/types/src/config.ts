import { Middleware } from './createRoute';
import { Logger } from './logger';

export type Config = {
  sourceDir?: string;
};

export type CreateConfig = () => Config;

export type CreateLoggerConfig = () => Logger;

type MiddlewareConfig = {
  global: Array<Middleware>;
};
export type CreateMiddlewareConfig = () => MiddlewareConfig;
