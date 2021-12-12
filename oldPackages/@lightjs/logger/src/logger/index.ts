import { importLightConfig } from '@lightjs/config';
import { Logger } from '@lightjs/types';

const config = importLightConfig();

export const logger: Logger = config.logs?.logger || console;
