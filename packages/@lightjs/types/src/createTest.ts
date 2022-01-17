import { CreateServer } from './createServer';
import { Middleware } from './createRoute';

export type CreateTestOptions = {
  middleware?: Middleware[];
};

export type CreateTest = CreateServer;
