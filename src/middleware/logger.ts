import pino from 'pino-http';
import { IncomingMessage, ServerResponse } from 'http';

const logger = pino();
export default (req: IncomingMessage, res: ServerResponse): any => logger(req, res);
