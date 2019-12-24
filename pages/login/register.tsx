import React,{ useEffect,useState } from 'react';
import {registerApi,checkUsernameApi} from '../../assets/api/login';
import { Button, Input, notification } from 'antd';
import './index.less';

export default () => {

  const initState = {
    loading: false,
    username:'',
    password:'',
    checked: false,// 是否可以注册
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
        notification.warn({ message: '提示', description: res.data.message, duration: 2});
      }
    })
  }
  // 检查用户名是否存在
  const doCheckUsername = (username: string) => {
    checkUsernameApi({username}).then(res => {
      const checked = res.data.data.isRegisted === 1;
      if (checked) {
        notification.warn({ message: '提示', description: res.data.message, duration: 2});
      }else {
        $set({ checked });
      }
    })
  }
  return (
    <div className='login_div'>
      <div className='content_div'>
        <Input 
          placeholder='请输入账号'
          onBlur={e => {
            const username = e.target.value;
            $set({ username });
            doCheckUsername(username);
          }}
        />
        <Input 
          placeholder='请输入密码'
          onBlur={e => $set({ password: e.target.value })}
        />
        <Button 
          loading={state.loading} 
          onClick={doRegister}
          disabled={!state.checked}
        >
          注册
        </Button>
      </div>
    </div>
  )
}