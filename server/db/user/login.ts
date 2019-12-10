import kConnection from '../knexHelper';
import knex, {QueryBuilder, } from 'knex';

export interface User {
  username: string,
  password: string,
}

const userBuilder = ():QueryBuilder => kConnection<User>('user');

// 查询
export const queryUserIds = (username = '', password = ''):QueryBuilder => {
  return userBuilder().where({
    username:username,
    password:password
  }).select()
}

