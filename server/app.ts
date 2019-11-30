
import express,{Request, Response} from 'express';
import next from 'next';
import * as User from './controller/user'
import './config/mysql'

const app = next({ dev: true });
const handle = app.getRequestHandler();
const server = express();


server.get('/doLogin',User.doLogin)
server.get('/doLogin1',User.doLogin1)
server.all('*',(req: Request,res: Response) => {
  handle(req, res);
})

app.prepare().then(() => {
  server.listen(3000)
})
export default server;
