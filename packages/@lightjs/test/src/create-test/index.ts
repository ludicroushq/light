import { createServer } from '@lightjs/server';
import { LightServer, CreateServerOptions } from '@lightjs/types';

export const createTest = (): LightServer => createServer();
