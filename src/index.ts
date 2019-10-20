const light = require('./light'); // eslint-disable-line

module.exports = light.default;
exports = light.default;

export { default as server } from './server';
export { default as params } from './params';
export { default as query } from './query';
export { default as test } from './test';
export { default as route } from './route';
export { default, default as light } from './light';
export {
  buffer,
  text,
  json,
  run,
  send,
  sendError,
} from 'micro';
export {
  createError,
} from 'micro-boom';
