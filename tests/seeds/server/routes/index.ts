import { light, Route } from '../../../../src/index';

class Index extends Route {
  public disableRequestLogger = true;

  public async handler() {
    return {
      hello: 'server',
    };
  }
}

module.exports = light(Index);
