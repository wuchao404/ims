import { User } from './../../modal/user';
import {Request, Response} from 'express';
import { insertUser2DB } from '../../db/user/register';
import { queryUserId } from '../../db/user/login';
import { createUserId } from '../../tools/userTool';
import * as ResData from '../../../utils/responseData';
import {ValidateParams} from '../../tools/middleWare/validateParams';
import { encryptMd5Pwd } from '../../tools/userTool'

// 注册接口
export const doRegister = async (req: Request, res: Response) => {
  const {
    username = '',
    password =  '',
    name =  '',
    birthday =  '',
    address =  '',
    mobilePhone =  ''
  } = req.body;
  // 校验必传参数
  const validate = new ValidateParams({ username, password }).validate(req,res);
  if (!validate) return;
  // 检查用户名是否存在
  const existUsername = await hasAlreadyRegisted(username);
  if (existUsername) { // 账号已存在则提示用户
    res.send(getResponse(existUsername));
    return;
  }
  const userId = createUserId();
  insertUser2DB({
    username,
    password: encryptMd5Pwd(password),
    userId,
    name,
    birthday,
    address,
    mobilePhone
  }).then((users: User[]) => {
    res.send(ResData.success({ message: '注册成功' }));
  }).catch(e => {
    res.send(ResData.error());
    console.error(req.originalUrl, e);
  });
};

// 检查用户名是否存在
export const checkUsername = async (req: Request, res: Response) => {
  const { username = '' } = req.query;
  const validate = new ValidateParams({username}).validate(req,res);
  if (!validate) return;
  console.log('username:',username)
  const has = await hasAlreadyRegisted(username);
  console.log('是否已注册：',has);
  res.send(getResponse(has));
}
// 改用户名是否已注册
const hasAlreadyRegisted = async (username: string): Promise<boolean> => {
  return queryUserId(username).then((users: User[]) => {
    console.log('查询注册user：',users);
    return  users.length > 0;
  }).catch((e) => {// 查询出现异常，要视为存在，不允许用户注册
    console.error(e);
    return true;
  });
}

const getResponse = (has: boolean):ResData.ResDataType  => {
  return ResData.info({
    status: 200,
    message: has ? '该账号已注册，请更换一个新的账号': '可以注册',
    data: {
      isRegisted: has ? 1 : 0
    }
  })
}