import { createServer } from '@lightjs/server';
import { LightServer } from '@lightjs/types';

export const createTest = (): LightServer => createServer();
