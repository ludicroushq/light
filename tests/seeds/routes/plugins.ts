import { route } from '../../../src/index';

const plugin = (fn: any): any => async (req: any, res: any): Promise<any> => {
  req.hello = 'plugin';
  return fn(req, res);
};

module.exports = route({
  path: '/plugin',

  plugins: [
    plugin,
  ],

  handler(req: any) {
    return {
      hello: req.hello,
    };
  },
});
