
import express,{Request, Response} from 'express';
import next from 'next';
import * as User from './user'

const app = next({ dev: true });
const handle = app.getRequestHandler();
const server = express();


server.get('/doLogin',User.doLogin)
server.all('*',(req: Request,res: Response) => {
  handle(req, res);
})

app.prepare().then(() => {
  server.listen(3000)
})
export default server;
