import { Options } from 'sequelize';
import * as configs from './index';

// 配置：详情见https://sequelize.org/v5/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
const config: Options = {
  dialect: 'mysql',
  host: configs.mysqlHost,
  port: 3306,
  database: configs.mysqlDb,
  username: configs.mysqlUser,
  password: configs.mysqlPwd,
  pool: {
    min: 5,
    max: 19,
    acquire: 60000, // 60秒连接不上就抛错误
  }
}
export default config;