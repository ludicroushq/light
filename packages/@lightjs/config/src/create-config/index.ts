import { LightConfig } from '@lightjs/types';

interface CreateConfig {
  root?: string;
}

export const createConfig = ({ root }: CreateConfig | undefined = {}): LightConfig => ({
  root,
});
