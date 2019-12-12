import kConnection from '../knexHelper';
import knex, {QueryBuilder, } from 'knex';

import { User } from '../../modal/user';

const userBuilder = ():QueryBuilder => kConnection<User>('user');

// 查询用户
export const queryUserIds = (username = '', password = ''):QueryBuilder => {
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

