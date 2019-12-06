import e, {Request, Response} from 'express';
import {query4cb,query} from '../../db/dbHelper'

export const doLogin = (req: Request, res: Response) => {
  const {username, password} = req.params
  console.log(`username:${username}, password:${password}`)
  query4cb('select * from user',(err,results,fields) => {
    
    res.send(results)
  });
}

export const doLogin1 = (req: Request, res: Response) => {
  query("select * from user where name like '%1%'").then((result) => {
    res.send(result)
  }).catch(err => {
    console.error(err);
  });
}
// insert语句
const inserSql = 'insert into user (user_id, username, password, name, birthday, address, mobile_phone) ' +
"values ('10001','wuchao1','123456','吴超1','2019-11-23','北京市昌平区','13598764356')";