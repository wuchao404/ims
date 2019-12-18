import express,{Express,Request, Response} from 'express';
import bodyParser from 'body-parser';
import NextServer from 'next/dist/next-server/server/next-server';
import { IncomingMessage, ServerResponse } from 'http';
import { UrlWithParsedQuery } from 'url';
import * as Login from './controller/user/login';
import * as Info from './controller/info';
import {interceptAPI} from './tools/interception'

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
    this.server.use('/api',bodyParser.json());// 解析post body
    this.server.use('/api', interceptAPI); // 通用拦截器
  }
  setAPI () {
    this.server.post('/api/doLogin',Login.doLogin);
    this.server.get('/api/info/list',Info.getInfoList);
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