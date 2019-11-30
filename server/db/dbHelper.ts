// 数据库帮助类，封装增删改查方法
import {MysqlError,PoolConnection,queryCallback,QueryOptions,FieldInfo} from 'mysql';
import mysqlPool from '../config/mysql';

type Resolve = (results?: any, fields?: FieldInfo[] | undefined) => void;
type Reject = (err: MysqlError | null) => void;

// 查询(支持回调))
export const query4cb = (options: string | QueryOptions, callback: queryCallback) => {
  mysqlPool.getConnection((err: MysqlError, connection: PoolConnection) => {
    connection.query(options,(err: MysqlError | null, results?: any, fields?: FieldInfo[]) => {
      callback(err,results,fields);
      connection.release();
    })
  })
}
// 查询支持Promise
export const query = (options: string | QueryOptions) => {
  return new Promise((resolve: Resolve, reject: Reject) => {
    mysqlPool.getConnection((err: MysqlError, connection: PoolConnection) => {
      connection.query(options,(err: MysqlError | null, results?: any, fields?: FieldInfo[] | undefined) => {
        if (err) {
          reject(err)
        } else {
          resolve(results,fields)
        }
        connection.release();
      })
    })
  })
}