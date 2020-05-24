/* eslint-disable no-undef, import/prefer-default-export */

interface Config {
  root?: string;
  global?: any;
  hooks?: {
    beforeStart: () => void;
  };
}

export {
  Config,
};
