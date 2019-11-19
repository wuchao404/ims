import express,{Request, Response} from 'express';
import next from 'next';

const dev = true;
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.get("/home",(req: Request, res: Response) => {
    app.render(req, res, '/home',req.query);
  });
  server.get("/login",(req: Request, res: Response) => {
    app.render(req, res, '/login',req.query);
  });
  server.all("*",(req: Request, res: Response) => {
    console.log('path:',req.path);
    handler(req, res);
  })
  server.listen(3000)
});