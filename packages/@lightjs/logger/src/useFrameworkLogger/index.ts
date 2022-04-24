/* eslint-disable no-console */
import { useLogger } from '../useLogger';

type FrameworkLogger = {
  info: (message: string) => void;
};
export function useFrameworkLogger(): FrameworkLogger {
  const logger = useLogger();

  return {
    info: (message: string) => {
      const info = (logger as unknown as any)?.info || console.info;
      info(message);
    },
  };
}
