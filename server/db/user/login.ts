import {QueryBuilder, } from 'knex';
import {userBuilder} from './index'


// 查询用户，根据username
export const queryUserId = (username: string):QueryBuilder => {
  return userBuilder().column(
    { 'userId':'user_id' },
    { 'mobilePhone': 'mobile_phone'},
    'username',
    'password',
    'name',
    'birthday',
    'address',
  ).where({
    username:username,
  }).select()
}

