import { Signale } from 'signale';

const defaults = {
  badge: '',
  color: 'green',
  logLevel: 'info',
};
const options = {
  types: {
    request: {
      ...defaults,
      label: 'REQUEST',
    },
    response: {
      ...defaults,
      label: '<',
    },
    start: {
      badge: '',
      label: 'start',
      color: 'redBright',
      logLevel: 'info',
    },
    listening: {
      badge: '',
      label: 'listening',
      color: 'magentaBright',
      logLevel: 'info',
    },
    hmr: {
      badge: '',
      label: 'hmr',
      color: 'blueBright',
      logLevel: 'info',
    },
  },
};

['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'TRACE', 'PATCH'].forEach((method): void => {
  (options.types as any)[method] = {
    ...defaults,
    label: method,
  };
});

const signale = new Signale(options);

signale.config({
  displayTimestamp: true,
  displayDate: false,
  underlineLabel: false,
});

module.exports = signale;
exports = signale;
export default signale;
