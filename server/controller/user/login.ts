import {Request, Response} from 'express';
import {queryUserId} from '../../db/user/login'
import {resData} from '../../../utils/common';
import { User } from '../../modal/user';
import { createJwtToken, verifyToken } from '../../../utils/jwt'
import { addToken2Redis } from '../../db/redisHelper'

export const doLogin = (req: Request, res: Response) => {
  const {username = '', password = ''} = req.body;
  queryUserId(username).then((users: User[]) => {
    
    const noData = resData.error({ message: '未查询到您的账号信息，请注册一个新的账号' });
    const failure = resData.error({ message: '账号密码不匹配，请重新输入' });
    if (users.length === 0) {
      res.send(noData);
    }else if (users.length === 1 && users[0].password === password){
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