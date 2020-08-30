import { createServer } from './create-server';
import { LightServer, CreateServerOptions } from './types/server';

interface CreateTestOptions extends CreateServerOptions {}

export const createTest = (args?: CreateTestOptions): LightServer =>
  createServer({ youch: false, requestLogger: false, ...args });
