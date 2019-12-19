import React,{ useEffect,useState } from 'react';
import {registerApi} from '../../assets/api/login';
import { Button, Input } from 'antd';

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
  // 注册接口
  const doRegister = () => {
    registerApi({
      username: state.username,
      password: state.password
    }).then(res => {
      if (res.data.status === 200) {
        
      }
    })
  }
  return (
    <div>
      <Input 
          placeholder='请输入账号'
          onBlur={e => $set({ username: e.target.value })}
      />
      <br />
      <Input 
          placeholder='请输入密码'
          onBlur={e => $set({ password: e.target.value })}
      />
      <br />
      <Button loading={state.loading} onClick={doRegister}>注册</Button>
    </div>
  )
}