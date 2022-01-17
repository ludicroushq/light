import { IncomingMessage, ServerResponse } from 'http';
import { createError } from 'micro';

export interface Request extends IncomingMessage {
  // params: Record<string, string | undefined>;
  // query: Record<string, string | string[]>;
}

export interface Response extends ServerResponse {}

// Context
type BodyParsingInfo = { limit?: string | number; encoding?: string };
export interface Context {
  req: Request;
  res: Response;
  buffer: (info?: BodyParsingInfo) => Promise<Buffer | string>;
  text: (info?: BodyParsingInfo) => Promise<string>;
  json: (info?: BodyParsingInfo) => Promise<object>;
  send: (code: number, data?: any) => Promise<void>;
  sendError: (info: {
    statusCode?: number;
    status?: number;
    message?: string;
    stack?: string;
  }) => Promise<void>;
  createError: typeof createError;
}
