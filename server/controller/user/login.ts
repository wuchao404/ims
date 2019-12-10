import {Request, Response} from 'express';
import {queryUserIds,User} from '../../db/user/login'
import {resData} from '../../../utils/common'

export const doLogin = (req: Request, res: Response) => {
  const {username = '', password = ''} = req.body;
  queryUserIds(username,password).then((users) => {
    const data = resData.success({ data: users });
    res.send(data);
  }).catch(e => {
    const err = resData.error({ message: '未查询到数据'});
    res.send(err);
  })
}