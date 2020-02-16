import { route } from '../../../../../src/index';

const { handler } = route();

module.exports = {
  default: handler(() => {}),
};
