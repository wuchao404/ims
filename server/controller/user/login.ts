import {Request, Response} from 'express';
import {queryUserId, queryUserId1} from '../../db/user/login'
import {resData} from '../../../utils/common';
import { User } from '../../modal/user';
import { createJwtToken, verifyToken } from '../../../utils/jwt'
import { addToken2Redis } from '../../db/redisHelper';
import { compareMd5 } from '../../tools/userTool';
import { UserModel } from '../../modal/userModel'

export const doLogin1 = (req: Request, res: Response) => {
  const {username = '', password = ''} = req.body;
  queryUserId(username).then((users: User[]) => {
    const noData = resData.error({ message: '未查询到您的账号信息，请注册一个新的账号' });
    const failure = resData.error({ message: '账号密码不匹配，请重新输入' });
    if (users.length === 0) {
      res.send(noData);
    }else if (users.length === 1 && compareMd5(password, users[0].password)){
      const token = createJwtToken(users[0]);
      addToken2Redis(token,users[0])
      const decode = verifyToken(token);
      console.log('decode-user:',decode)
      const success = resData.success({ 
        message: '登陆成功', 
        data: { token } 
      });
      res.send(success);
    } else {
      res.send(failure);
    }
  }).catch(e => {
    console.error('doLogin:',e)
    const err = resData.error({ message: '未查询到数据'});
    res.send(err);
  })
}

export const doLogin = (req: Request, res: Response) => {
  const {username = '', password = ''} = req.body;
  queryUserId1(username).then((users: UserModel[]) => {
    const noData = resData.error({ message: '未查询到您的账号信息，请注册一个新的账号' });
    const failure = resData.error({ message: '账号密码不匹配，请重新输入' });
    const multiErr = resData.error({ message: '系统查询到多个账号，请联系客服' });
    if (users.length === 0) {
      res.send(noData);
    }else if (users.length === 1){
      const user = <UserModel>users[0].get();// 获取实例
      if (compareMd5(password, user.password)) {
        const token = createJwtToken(user);
        addToken2Redis(token,user)
        const decode = verifyToken(token);
        console.log('decode-user:',decode)
        const success = resData.success({ 
          message: '登陆成功', 
          data: { token } 
        });
        res.send(success);
      }else {
        res.send(failure);
      }
    } else {
      res.send(multiErr);
    }
  }).catch(e => {
    console.error('doLogin:',e)
    const err = resData.error({ message: '未查询到数据'});
    res.send(err);
  })
}