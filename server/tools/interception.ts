import {Request, Response} from 'express';
import {verifyToken} from '../../utils/jwt';
import { inWhiteList } from './whiteList';
import * as ResData from '../../utils/responseData';
import { existTokenInRedis } from '../db/redisHelper'


// express自定义拦截器
export const interceptAPI = (req: Request, res: Response, next: Function) => {
  const token = req.get('token');
  const { path = '',baseUrl = '' } = req;
  console.log('baseUrl: ',req.baseUrl)
  console.log('originalUrl: ',req.originalUrl)
  console.log('interceptAPI,path:',path);
  const fullPath = baseUrl + path;
  console.log('fullPath: '+ fullPath)
  if (inWhiteList(fullPath)) { // 白名单内不校验token
    next();
  }else {
    const user = verifyToken(token);
    console.log('interceptAPI,user:', user);
    const isExist = existTokenInRedis(token!);
    if (!user) { // token解析失败
      res.send(ResData.error({
        status: 40001,
        message: '非法token'
      }));
    }else if (user.exp! <= 0){ // 已过期
      res.send(ResData.error({
        status: 40000,
        message: '登陆已过期，请重新登录'
      }));
    } else if (!isExist) { // redis中不存在
      res.send(ResData.error({
        status: 40002,
        message: '登陆已过期，请重新登录'
      }));
    }else {
      next();
    }
  }
}