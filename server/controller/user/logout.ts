import {Request, Response} from 'express';
import * as ResData from '../../../utils/responseData';
import { User } from '../../modal/user';
import { createJwtToken, verifyToken } from '../../../utils/jwt'
import { deleteByToken } from '../../db/redisHelper'

// 退出登陆
export const doLogout = (req: Request, res: Response) => {
  const token = req.get('token');
  const isDelete = deleteByToken(token);
  if (isDelete) {
    res.send(ResData.success({message: '退出成功'}));
  }else {
    res.send(ResData.error({message: '退出失败'}));
  }
}