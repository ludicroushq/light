import createServer from './create-server';
import { LightServer } from './types/server';

export default (): LightServer => createServer();
