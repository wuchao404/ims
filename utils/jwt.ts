import { User } from '../server/modal/user';
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
export const verifyToken = (token = ''): User => {
  return <User>(jwt.verify(token, jwtSecret));
}