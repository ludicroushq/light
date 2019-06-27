import { IncomingMessage, ServerResponse } from 'http';

import isProd from '../is-prod';

type IM = IncomingMessage;
type SR = ServerResponse;

let Youch: any;
let forTerminal: any;

/* istanbul ignore next */
if (!isProd) {
  Youch = require('youch'); // eslint-disable-line
  forTerminal = require('youch-terminal'); // eslint-disable-line
  module.exports = (fun: any): any => async (req: IM, res: SR): Promise<void> => {
    try {
      return await fun(req, res);
    } catch (err) {
      const youch = new Youch(err, req);
      const json = await youch.toJSON();
      console.log(forTerminal(json)); // eslint-disable-line
      throw err;
    }
  };
} else {
  module.exports = (fun: any) => async (req: IM, res: SR) => await fun();
}
