
import express,{Request, Response} from 'express';
import next from 'next';
// import * as User from './controller/user'
// import './config/mysql';
import './db/knexHelper';
import * as configs from './config/index';
import bodyParser from 'body-parser';
import * as Login from './controller/user/login'


console.log("env:"+process.env.NODE_ENV)
const app = next({ dev: configs.dev });
const handle = app.getRequestHandler();
const server = express();
server.use('/api',bodyParser.json());

server.post('/api/doLogin',Login.doLogin)

server.all('*',(req: Request,res: Response) => {
  handle(req, res);
})

app.prepare().then(() => {
  server.listen(3000)
})
export default server;
