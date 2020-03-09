
import next from 'next';
import NextServer from 'next/dist/next-server/server/next-server';
import './db/knexHelper';
import './db/sequelizeHelper';
import './db/redisHelper';
import * as configs from './config/index';
import ExpressServer from './expressServer';
import {Express} from 'express';


const app: NextServer = next({ dev: configs.dev });
const server: Express = new ExpressServer(app).init();

app.prepare().then(() => {
  server.listen(configs.port)
}).catch(e => {
  console.error('app.js:',e);
})
export default server;
