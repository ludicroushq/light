import { route, global } from '../../../../../src/index';

const { handler } = route();
const glob = global();

module.exports = handler(() => ({
  hello: glob,
}));
