import { IncomingMessage, ServerResponse } from 'http';

type IM = IncomingMessage;
type SR = ServerResponse;

let Youch: any;
let forTerminal: any;

export default (isProd: boolean) => {
  if (isProd) {
    return (fun: any): any => async (req: IM, res: SR): Promise<any> => fun(req, res);
  }
  Youch = require('youch'); // eslint-disable-line
  forTerminal = require('youch-terminal'); // eslint-disable-line
  return (fun: any): any => async (req: IM, res: SR): Promise<void> => {
    try {
      return await fun(req, res);
    } catch (err) {
      const youch = new Youch(err, req);
      const json = await youch.toJSON();
      console.log(forTerminal(json)); // eslint-disable-line
      throw err;
    }
  };
}
