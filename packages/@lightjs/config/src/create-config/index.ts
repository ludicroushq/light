import { Config } from '@lightjs/types';

const createConfig = () => {
  let config: Config = {};
  const useConfig = (newConfig: Config) => {
    // We can't just redefine the `config` variable since it will not propagate
    // Instead we should update the Object. This is not foolproof but it should work
    Object.keys(newConfig).forEach((key) => {
      const configKey = key as keyof Config;
      config[configKey] = newConfig[key as keyof Config];
    });
  };
  return { config, useConfig };
};

const { config, useConfig } = createConfig();

export { config, useConfig };
