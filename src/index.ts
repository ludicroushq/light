const route = require('./route'); // eslint-disable-line

module.exports = route.default;
exports = route.default;

export { default as server } from './server';
export { default as query } from './query';
export { default, default as route, default as light } from './route';
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
