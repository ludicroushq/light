import { createServer } from './create-server';
import { LightServer } from './types/server';

export const createTest = (): LightServer => createServer();
