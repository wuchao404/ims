import http, {IncomingMessage, ServerResponse} from 'http';
import next from 'next';
import url from 'url';

const dev = true;
const app = next({ dev});
const handle = app.getRequestHandler();
app.prepare().then(() => {
  http.createServer((req: IncomingMessage, res: ServerResponse)=>{
    const parseUrl = url.parse(req.url!, true);
    const {pathname, query} = parseUrl;
    
    switch(pathname){
      case '/home':
        app.render(req,res,pathname,query);
        break;
      case '/login':
        app.render(req,res,pathname,query);
        break;
      default:
        handle(req, res, parseUrl);
        break
    }
  }).listen(99);
  
});