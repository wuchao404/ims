import { User } from './../../modal/user';
import { userBuilder } from './index';
import {QueryBuilder } from 'knex';

// 向数据库中添加新用户
export const insertUser2DB = (user: User):QueryBuilder => {
  return userBuilder().insert([{
    'user_id': user.userId || '',
    'username': user.username || '', 
    'password': user.password || '', 
    'name': user.name || '', 
    'birthday': user.birthday || '', 
    'address': user.address || '', 
    'mobile_phone': user.mobilePhone || ''
  }])
}