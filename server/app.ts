
import next from 'next';
import NextServer from 'next/dist/next-server/server/next-server';
import './db/knexHelper';
import './db/redisHelper';
import * as configs from './config/index';
import ExpressServer from './expressServer';
import {Express} from 'express';


// console.log("env:"+process.env.NODE_ENV)
const app: NextServer = next({ dev: configs.dev });
const server: Express = new ExpressServer(app).init();

app.prepare().then(() => {
  server.listen(4000)
})
export default server;
