import React,{useState, useEffect} from 'react';
import {Input, Button} from 'antd'
import './index.less';
import axios from '../../utils/axios'

export default () => {
  const initState = {
    loading: false,
    username:'',
    password:''
  };
  const [state, setState] = useState(initState);

  // setState方法
  const $set = (curState: any) => {
    if (typeof curState !== 'object') return;
    setState(preState => ({...preState, ...curState}))
  };
  // 登录接口
  const doLogin = () => {
    axios({
      method:'post',
      url: '/api/doLogin',
      data: {
        username: state.username,
        password: state.password
      }
    }).then(res => {
      console.log("res:", res);
    })
  }
  return (
    <div className='login_div'>
      <div className='content_div'>
        <Input 
          placeholder='请输入账号'
          onBlur={e => $set({ username: e.target.value })}
        />
        <Input 
          placeholder='请输入密码'
          onBlur={e => $set({ password: e.target.value })}
        />
        <Button
          type='primary'
          onClick={doLogin}
        >登录</Button>
      </div>
    </div>
  )
}