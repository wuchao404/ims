import mysql,{ConnectionConfig} from 'mysql';
import * as configs from '../config/index'
// 数据库启动配置
const config: ConnectionConfig = {
  host: configs.mysqlHost,
  port:3306,
  user:'wuchao',
  password:'123456',
  database: 'management'
}
const pool = mysql.createPool(config);

export default pool;




