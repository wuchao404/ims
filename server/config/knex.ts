import {Config} from 'knex';
import * as configs from '../config/index'

const config:Config = {
  client:'mysql',
  connection: {
    host: configs.mysqlHost,
    port: 3306,
    user: 'admin',
    password:configs.mysqlPwd,
    database: 'management',
  },
  pool:{// 连接池
    min:1,
    max:10,
  },
  debug: true
}
export default config;
