import mysql,{ConnectionConfig,MysqlError,PoolConnection,QueryFunction,queryCallback} from 'mysql';
// 数据库启动配置
const config: ConnectionConfig = {
  host:'123.206.72.106',
  port:3306,
  user:'root',
  password:'w53476157',
  database: 'management'
}
const pool = mysql.createPool(config);

export default pool;




