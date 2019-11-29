import {Request, Response} from 'express';

export const doLogin = (req: Request, res: Response) => {
  res.send('测试doLogin接口')
}