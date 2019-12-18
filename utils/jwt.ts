import { User, DecodeUser } from './../server/modal/user';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../server/config'

/**
 * 生成jwt-token
 * @param user 用户信息
 * @return string
 */
export const createJwtToken = (user: User): string => {
  user.password && delete user.password;
  return jwt.sign({...user},jwtSecret,{
    expiresIn: '24h', // 一天
  });
}
/**
 * 验证token
 * @param token token字符串
 * @return User类型 
 */
export const verifyToken = (token = ''): DecodeUser | undefined => {
  let user: DecodeUser | undefined;
  try {
    user = <DecodeUser>(jwt.verify(token, jwtSecret))
  }catch (err) {
    console.error('token解析失败,token:',token);
  }
  return user;
}