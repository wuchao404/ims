import e, {Request, Response} from 'express';
import {query4cb,query} from '../../db/dbHelper';
import {SuccessData} from '../../../utils/common'

export const doLogin = (req: Request, res: Response) => {
  const {username = '', password = ''} = req.body;
  console.log(`username:${username}, password:${password}`)
  const sql = `select * from user where username='${username}' and password='${password}'`;
  console.log("sql:",sql)
  query(sql).then(result => {
    res.send(SuccessData({
      status:200,
      message:'操作成功',
      data: []
    }))
  });
}

export const doLogin1 = (req: Request, res: Response) => {
  query("select * from user where name like '%1%'").then((result) => {
    res.send(SuccessData({
      status:200,
      message:'操作成功',
      data: []
    }))
  }).catch(err => {
    console.error(err);
  });
}
// insert语句
const inserSql = 'insert into user (user_id, username, password, name, birthday, address, mobile_phone) ' +
"values ('10001','wuchao1','123456','吴超1','2019-11-23','北京市昌平区','13598764356')";