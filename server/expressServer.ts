import express,{Express,Request, Response} from 'express';
import bodyParser from 'body-parser';
import NextServer from 'next/dist/next-server/server/next-server';
import { IncomingMessage, ServerResponse } from 'http';
import { UrlWithParsedQuery } from 'url';
import * as Login from './controller/user/login';

// express服务
class ExpressServer {
  private server: Express;
  private app : NextServer;
  private handle: (req: IncomingMessage, res: ServerResponse, parsedUrl?: UrlWithParsedQuery | undefined) => Promise<void>;
  constructor (app: NextServer) {
    this.server = express();
    this.app = app;
    this.handle = app.getRequestHandler();
  }
  setUse () {
    this.server.use('/api',bodyParser.json());
  }
  setAPI () {
    this.server.post('/api/doLogin',Login.doLogin)
    this.server.all('*',(req: Request,res: Response) => {
      this.handle(req, res);
    })
  }
  init ():Express {
    this.setUse();
    this.setAPI();
    return this.server;
  }  
}
export default ExpressServer;