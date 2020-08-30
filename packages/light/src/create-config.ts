import { LightConfig } from './types/config';

type CreateConfig = {
  root?: string;
};

export const createConfig = ({ root }: CreateConfig): LightConfig => ({
  root,
});
