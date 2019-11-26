import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import {Button} from 'antd'

export default () => {
  const encryptFkey = (oldF: string, date: Date) => {
    const ddHHmmss = moment(date).format('DDHHmmss');
    const times = ddHHmmss.split('');
    return oldF.split('').map((str: string, index: number) => {
      const number = (str.charCodeAt(0) ^ (times[index].charCodeAt(0) + 32)) - 1;
      return String.fromCharCode(number);
    }).join('');
  }
  const getStr = () => {
    const date = new Date();
    date.setTime(1574764249607);
    const encode = encryptFkey('abcdefgh', date)
    console.log("加密后: " + encode);
    console.log("timestamp: " + date.getTime())
    return encode;
  }
  return (
    <div>
      <div>编码后：{getStr()}</div>
      <Link href="/home"><a>跳转到主页</a></Link>
      <br />
      <Link href="/login"><a>登录页</a></Link>
      <div>
        <Button type="primary">确定</Button>
      </div>
    </div>
  )
}