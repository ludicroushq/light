import { IncomingMessage, ServerResponse } from 'http';
import type { Handler } from '@netlify/functions';
import { Context } from './context';

export type RunKitRoute = { endpoint: (req: IncomingMessage, res: ServerResponse) => any };
export type VercelRoute = (req: IncomingMessage, res: ServerResponse) => any;
export type NetlifyRoute = { handler: Handler };
export type ServerfullRoute = (ctx: Context) => any;
export type ServerlessRoute = RunKitRoute | VercelRoute | NetlifyRoute;
export type RouteHandler = ServerfullRoute | ServerlessRoute;
