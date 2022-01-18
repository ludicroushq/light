import { createServer } from '@lightjs/server';
import { CreateTestOptions, CreateTest } from '@lightjs/types';

export function createTest(opts?: CreateTestOptions): CreateTest {
  const server = createServer({ middleware: opts?.middleware });
  return server;
}
