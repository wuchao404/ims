import { User } from './../../modal/user';
import {Request, Response} from 'express';
import { queryUserIds } from '../../db/user/login';

// 注册接口
export const doRegister = (req: Request, res: Response) => {
  const { username = ''} = req.body;
  queryUserIds(username).then((users: User[]) => {

  }).catch(e => {
    console.error('doRegister接口')
  });
};
