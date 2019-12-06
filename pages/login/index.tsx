import React from 'react';
import {Input, Button} from 'antd'
import './index.less';

export default () => {
  return (
    <div className='login_div'>
      <div className='content_div'>
        <Input 
          placeholder='请输入账号'
        />
        <Input 
          placeholder='请输入密码'
        />
        <Button type='primary'>登录</Button>
      </div>
    </div>
  )
}