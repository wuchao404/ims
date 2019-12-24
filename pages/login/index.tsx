import React,{useState, useEffect} from 'react';
import {Input, Button} from 'antd'
import './index.less';
import axios from '../../utils/axios'
import {setToken} from '../../utils/frontend/storage';
import Router from 'next/router'
import routerMap from '../../router/routerMap';
import {loginApi} from '../../assets/api/login'

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
    loginApi({
      username: state.username,
      password: state.password
    }).then(res => {
      if (res.data.status === 200) {
        setToken(res.data.data.token);
        Router.replace(routerMap.home.pathname);
      }
    })
  }
  return (
    <div className='login_div'>
      <div className='content_div'>
        <Input 
          placeholder='请输入账号'
          allowClear={true}
          onBlur={e => $set({ username: e.target.value })}
        />
        <Input.Password
          placeholder='请输入密码'
          allowClear={true}
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