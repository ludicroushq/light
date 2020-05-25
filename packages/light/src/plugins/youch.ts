import Youch from 'youch';
import forTerminal from 'youch-terminal';

import { Request, Response } from '../types/route';

export default (fun: any): any => async (req: Request, res: Response): Promise<void> => {
  try {
    return await fun(req, res);
  } catch (err) {
    const youch = new Youch(err, req);
    const json = await youch.toJSON();
    console.log(forTerminal(json)); // eslint-disable-line
    return youch.toHTML();
  }
};
