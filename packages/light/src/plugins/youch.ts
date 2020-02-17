import Youch from 'youch';
import forTerminal from 'youch-terminal';

import { IM, SR } from '../types/http';

export default (fun: any): any => async (req: IM, res: SR): Promise<void> => {
  try {
    return await fun(req, res);
  } catch (err) {
    const youch = new Youch(err, req);
    const json = await youch.toJSON();
    console.log(forTerminal(json)); // eslint-disable-line
    return youch.toHTML();
  }
};
