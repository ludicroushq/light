/* eslint-disable no-undef, import/prefer-default-export */

export interface LightConfig {
  root?: string;
  typescript?: boolean;
  logger?: () => any;
  requestLogger?: () => any;
}
