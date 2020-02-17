// if we need a default export, the following code will work
// const light = require('./light'); // eslint-disable-line
// module.exports = light.default;
// exports = light.default;
// export { default, default as light } from './light';

export { default as server } from './server';
export { default as model } from './use-model';
export { default as useFactory } from './use-factory';
export { default as params } from './params';
export { default as query } from './query';
// export { default as test } from './test';
export { default as useRoute } from './use-route';
// export { default as router } from './router';
export { default as global } from './global';
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
